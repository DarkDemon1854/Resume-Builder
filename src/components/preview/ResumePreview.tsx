import { useState, useRef, useEffect, useCallback, useReducer } from 'react'
import { usePreview } from '@/hooks/usePreview'
import PreviewSectionRenderer from './PreviewSectionRenderer'
import PreviewEmptyState from './PreviewEmptyState'
import './preview.css'

type Props = {
  resumeId: string
}

const MIN_SCALE = 0.3
const MAX_SCALE = 1.5
const SCALE_STEP = 0.1

export default function ResumePreview({ resumeId }: Props) {
  const preview = usePreview(resumeId)
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const userZoomed = useRef(false)

  const fitToContainer = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const available = el.clientWidth - 48
    const a4Width = 794
    const fit = Math.min(available / a4Width, 1)
    setScale(Math.max(MIN_SCALE, Math.min(fit, MAX_SCALE)))
  }, [])

  useEffect(() => {
    fitToContainer()
    const observer = new ResizeObserver(() => {
      if (!userZoomed.current) fitToContainer()
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => { observer.disconnect() }
  }, [fitToContainer])

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
      if (!userZoomed.current) {
        setTimeout(fitToContainer, 50)
      }
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => { document.removeEventListener('fullscreenchange', handleFsChange) }
  }, [fitToContainer])

  const zoomIn = useCallback(() => {
    userZoomed.current = true
    setScale(s => Math.min(+(s + SCALE_STEP).toFixed(1), MAX_SCALE))
  }, [])

  const zoomOut = useCallback(() => {
    userZoomed.current = true
    setScale(s => Math.max(+(s - SCALE_STEP).toFixed(1), MIN_SCALE))
  }, [])

  const resetZoom = useCallback(() => {
    userZoomed.current = false
    fitToContainer()
    forceUpdate()
  }, [fitToContainer])

  const toggleFullscreen = useCallback(() => {
    const el = wrapperRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      void el.requestFullscreen()
    } else {
      void document.exitFullscreen()
    }
  }, [])

  if (!preview) return null

  const scaledHeight = 297 * 3.78 * scale
  const marginBottom = scaledHeight > (containerRef.current?.clientHeight ?? 0)
    ? scaledHeight - (containerRef.current?.clientHeight ?? 0) + 32
    : 0

  return (
    <div ref={wrapperRef} className="flex flex-col h-full min-h-0 bg-neutral-950">
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800/60 shrink-0">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: preview.templateMeta.previewColor }}
          />
          <span className="text-xs font-medium text-neutral-300">
            {preview.templateMeta.name}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={zoomOut}
            className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOutIcon />
          </button>
          <button
            type="button"
            onClick={resetZoom}
            className="min-w-[3rem] text-center text-xs text-neutral-500 tabular-nums select-none hover:text-neutral-300 transition-colors"
            aria-label="Reset zoom"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            type="button"
            onClick={zoomIn}
            className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
            aria-label="Zoom in"
          >
            <ZoomInIcon />
          </button>
          <div className="w-px h-4 bg-neutral-800 mx-0.5" />
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
          </button>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 overflow-auto preview-panel">
        <div className="preview-scale-wrapper" style={{ paddingBottom: `${String(marginBottom)}px` }}>
          <div
            className="preview-a4 shadow-xl rounded-sm"
            style={{ transform: `scale(${scale.toString()})`, transformOrigin: 'top center' }}
          >
            {preview.isEmpty ? (
              <PreviewEmptyState />
            ) : (
              <PreviewSectionRenderer
                key={preview.templateId}
                TemplateComponent={preview.TemplateComponent}
                normalizedResume={preview.normalizedResume}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ZoomInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  )
}

function ZoomOutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  )
}

function FullscreenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  )
}

function ExitFullscreenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  )
}
