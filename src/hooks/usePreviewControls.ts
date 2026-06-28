import { useState, useRef, useEffect, useCallback } from 'react'

export type ViewportMode = 'desktop' | 'tablet' | 'mobile'

const MIN_SCALE = 0.25
const MAX_SCALE = 2.0
const SCALE_STEP = 0.1
const A4_WIDTH_PX = 794
const CANVAS_PADDING = 48

type UsePreviewControlsOptions = {
  initialViewport?: ViewportMode
}

export function usePreviewControls(
  containerRef: React.RefObject<HTMLDivElement | null>,
  options: UsePreviewControlsOptions = {}
) {
  const { initialViewport = 'desktop' } = options
  const [viewport, setViewport] = useState<ViewportMode>(initialViewport)
  const [scale, setScale] = useState<number>(0.5)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const userZoomed = useRef(false)
  const scaleRef = useRef(scale)
  const pinchOrigin = useRef<{ dist: number; scale: number } | null>(null)

  useEffect(() => {
    scaleRef.current = scale
  }, [scale])

  const fitToContainer = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const available = el.clientWidth - CANVAS_PADDING
    const fit = Math.min(available / A4_WIDTH_PX, 1)
    setScale(parseFloat(Math.max(MIN_SCALE, Math.min(fit, MAX_SCALE)).toFixed(2)))
  }, [containerRef])

  const zoomIn = useCallback(() => {
    userZoomed.current = true
    setScale(s => parseFloat(Math.min(s + SCALE_STEP, MAX_SCALE).toFixed(2)))
  }, [])

  const zoomOut = useCallback(() => {
    userZoomed.current = true
    setScale(s => parseFloat(Math.max(s - SCALE_STEP, MIN_SCALE).toFixed(2)))
  }, [])

  const resetZoom = useCallback(() => {
    userZoomed.current = false
    fitToContainer()
  }, [fitToContainer])

  const setViewportMode = useCallback((mode: ViewportMode) => {
    userZoomed.current = false
    setViewport(mode)
  }, [])

  useEffect(() => {
    fitToContainer()
    const observer = new ResizeObserver(() => {
      if (!userZoomed.current) fitToContainer()
    })
    const el = containerRef.current
    if (el) observer.observe(el)
    return () => { observer.disconnect() }
  }, [fitToContainer, containerRef])

  useEffect(() => {
    if (!userZoomed.current) fitToContainer()
  }, [viewport, fitToContainer])

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
      if (!userZoomed.current) setTimeout(fitToContainer, 60)
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => { document.removeEventListener('fullscreenchange', onFsChange) }
  }, [fitToContainer])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let hovering = false

    const onMouseEnter = () => { hovering = true }
    const onMouseLeave = () => { hovering = false }

    const onKeyDown = (e: KeyboardEvent) => {
      if (!hovering || (!e.ctrlKey && !e.metaKey)) return
      if (e.key === '=' || e.key === '+') {
        e.preventDefault()
        zoomIn()
      } else if (e.key === '-') {
        e.preventDefault()
        zoomOut()
      } else if (e.key === '0') {
        e.preventDefault()
        resetZoom()
      }
    }

    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [containerRef, zoomIn, zoomOut, resetZoom])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const pinchDist = (t: TouchList): number => {
      const dx = t[0].clientX - t[1].clientX
      const dy = t[0].clientY - t[1].clientY
      return Math.hypot(dx, dy)
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 2) return
      pinchOrigin.current = { dist: pinchDist(e.touches), scale: scaleRef.current }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || !pinchOrigin.current) return
      e.preventDefault()
      const ratio = pinchDist(e.touches) / pinchOrigin.current.dist
      const next = parseFloat(
        Math.max(MIN_SCALE, Math.min(pinchOrigin.current.scale * ratio, MAX_SCALE)).toFixed(2)
      )
      userZoomed.current = true
      setScale(next)
    }

    const onTouchEnd = () => {
      pinchOrigin.current = null
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [containerRef])

  return {
    scale,
    scalePercent: Math.round(scale * 100),
    viewport,
    isFullscreen,
    MIN_SCALE,
    MAX_SCALE,
    zoomIn,
    zoomOut,
    resetZoom,
    fitToScreen: resetZoom,
    setViewportMode,
    fitToContainer,
  }
}
