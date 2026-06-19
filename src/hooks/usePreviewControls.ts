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
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if ((e.ctrlKey || e.metaKey) && e.key === '=') {
        e.preventDefault()
        zoomIn()
      } else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault()
        zoomOut()
      } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault()
        resetZoom()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey) }
  }, [zoomIn, zoomOut, resetZoom])

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
    setViewportMode,
    fitToContainer,
  }
}
