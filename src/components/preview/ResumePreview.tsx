import { useRef, memo } from 'react'
import { usePreview } from '@/hooks/usePreview'
import { usePreviewControls, type ViewportMode } from '@/hooks/usePreviewControls'
import { useTemplateTransition } from '@/hooks/useTemplateTransition'
import { getTemplate, TEMPLATE_REGISTRY } from '@/templates'
import { useResumeStore, selectResumeById } from '@/store/resumeStore'
import type { NormalizedResume } from '@/templates/types'
import type { TemplateId } from '@/constants'
import PreviewEmptyState from './PreviewEmptyState'
import './preview.css'

type Props = {
  resumeId: string
}

const A4_WIDTH_PX = 794
const A4_MIN_HEIGHT_PX = 1123

export default function ResumePreview({ resumeId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const preview = usePreview(resumeId)
  const resume = useResumeStore(selectResumeById(resumeId))

  const {
    scale,
    scalePercent,
    viewport,
    isFullscreen,
    MIN_SCALE,
    MAX_SCALE,
    zoomIn,
    zoomOut,
    resetZoom,
    setViewportMode,
  } = usePreviewControls(containerRef)

  const activeTemplateId = resume?.templateId ?? 'modern'
  const { displayedTemplateId, transitionState, isSwitching } = useTemplateTransition(activeTemplateId)

  const toggleFullscreen = () => {
    const el = wrapperRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      void el.requestFullscreen()
    } else {
      void document.exitFullscreen()
    }
  }

  if (!preview || !resume) return null

  const safeDisplayId = (displayedTemplateId in TEMPLATE_REGISTRY
    ? displayedTemplateId
    : activeTemplateId) as TemplateId
  const TemplateComponent = getTemplate(safeDisplayId).component
  const normalizedResume = preview.normalizedResume

  const canZoomIn = scale < MAX_SCALE
  const canZoomOut = scale > MIN_SCALE

  const scaledWidth = Math.round(A4_WIDTH_PX * scale)
  const scaledHeight = Math.round(A4_MIN_HEIGHT_PX * scale)

  return (
    <div ref={wrapperRef} className="preview-root">
      <div className="preview-toolbar">
        <div className="preview-toolbar-left">
          <div
            className="preview-template-dot"
            style={{ backgroundColor: preview.templateMeta.previewColor }}
          />
          <span className="preview-template-name">
            {preview.templateMeta.name}
          </span>
          {isSwitching && <span className="preview-switching-badge">Switching…</span>}
        </div>

        <div className="preview-viewport-tabs" role="tablist" aria-label="Preview viewport">
          {(['desktop', 'tablet', 'mobile'] as ViewportMode[]).map(mode => (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={viewport === mode}
              aria-label={`${mode} preview`}
              onClick={() => { setViewportMode(mode) }}
              className={`preview-viewport-btn${viewport === mode ? ' active' : ''}`}
            >
              {mode === 'desktop' && <DesktopIcon />}
              {mode === 'tablet' && <TabletIcon />}
              {mode === 'mobile' && <MobileIcon />}
            </button>
          ))}
        </div>

        <div className="preview-zoom-controls">
          <button
            type="button"
            onClick={zoomOut}
            disabled={!canZoomOut}
            className="preview-ctrl-btn"
            aria-label="Zoom out (Ctrl -)"
            title="Zoom out (Ctrl −)"
          >
            <ZoomOutIcon />
          </button>
          <button
            type="button"
            onClick={resetZoom}
            className="preview-zoom-pct"
            aria-label="Reset zoom (Ctrl 0)"
            title="Reset zoom (Ctrl 0)"
          >
            {scalePercent}%
          </button>
          <button
            type="button"
            onClick={zoomIn}
            disabled={!canZoomIn}
            className="preview-ctrl-btn"
            aria-label="Zoom in (Ctrl +)"
            title="Zoom in (Ctrl +)"
          >
            <ZoomInIcon />
          </button>
          <div className="preview-toolbar-divider" />
          <button
            type="button"
            onClick={toggleFullscreen}
            className="preview-ctrl-btn"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
          </button>
        </div>
      </div>

      <div ref={containerRef} className="preview-canvas">
        <div className="preview-canvas-inner">
          <ViewportFrame mode={viewport} scaledWidth={scaledWidth} scaledHeight={scaledHeight}>
            {/*
              Scale wrapper: occupies the VISUAL (post-scale) size in layout space.
              The A4 child is positioned absolutely at full size, scaled from top-left.
              This is the correct pattern — transform: scale() does NOT affect layout,
              so without this wrapper the 794px A4 would overflow and get clipped.
            */}
            <div
              className="preview-scale-wrapper"
              style={{ width: scaledWidth, height: scaledHeight }}
            >
              <div
                className={`preview-a4 preview-doc-transition${transitionState === 'leaving' ? ' is-leaving' : ''}${transitionState === 'entering' ? ' is-entering' : ''}`}
                style={{
                  width: A4_WIDTH_PX,
                  minHeight: A4_MIN_HEIGHT_PX,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
              >
                {preview.isEmpty ? (
                  <PreviewEmptyState />
                ) : (
                  <TemplateRender
                    key={displayedTemplateId}
                    TemplateComponent={TemplateComponent}
                    normalizedResume={normalizedResume}
                  />
                )}
              </div>
            </div>
          </ViewportFrame>
        </div>
      </div>
    </div>
  )
}

type TemplateRenderProps = {
  TemplateComponent: React.ComponentType<{ resume: NormalizedResume }>
  normalizedResume: NormalizedResume
}

const TemplateRender = memo(function TemplateRender({
  TemplateComponent,
  normalizedResume,
}: TemplateRenderProps) {
  return (
    <div className="template-enter">
      <TemplateComponent resume={normalizedResume} />
    </div>
  )
})

type ViewportFrameProps = {
  mode: ViewportMode
  scaledWidth: number
  scaledHeight: number
  children: React.ReactNode
}

function ViewportFrame({ mode, scaledWidth, scaledHeight, children }: ViewportFrameProps) {
  if (mode === 'desktop') {
    return <div className="preview-frame-desktop">{children}</div>
  }

  if (mode === 'tablet') {
    return (
      <div
        className="preview-device-frame preview-device-tablet"
        style={{ width: scaledWidth + 40 }}
        aria-label="Tablet preview frame"
      >
        <div className="preview-device-chrome">
          <div className="preview-device-camera" />
        </div>
        <div className="preview-device-screen" style={{ height: scaledHeight }}>
          {children}
        </div>
        <div className="preview-device-home-tablet" />
      </div>
    )
  }

  return (
    <div
      className="preview-device-frame preview-device-mobile"
      style={{ width: scaledWidth + 32 }}
      aria-label="Mobile preview frame"
    >
      <div className="preview-device-notch" />
      <div className="preview-device-screen" style={{ height: scaledHeight }}>
        {children}
      </div>
      <div className="preview-device-home-bar" />
    </div>
  )
}

function ZoomInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  )
}

function ZoomOutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  )
}

function FullscreenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  )
}

function ExitFullscreenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  )
}

function DesktopIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

function TabletIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  )
}

function MobileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  )
}
