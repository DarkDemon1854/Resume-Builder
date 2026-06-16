import { useState, useCallback } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { useResume } from '@/hooks/useResume'
import { useBuilderNavigation } from '@/hooks/useBuilderNavigation'
import { useSectionValidation } from '@/hooks/useSectionValidation'
import { useIsMobile, useIsTablet } from '@/hooks/useMediaQuery'
import BuilderHeader from '@/components/resume/BuilderHeader'
import SectionNav from '@/components/resume/SectionNav'
import SectionRenderer from '@/components/resume/SectionRenderer'
import { ResumePreview } from '@/components/preview'
import { TemplateSelector } from '@/components/preview'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { ROUTES, type ResumeSectionKey, type TemplateId } from '@/constants'
import { toast } from '@/store/toastStore'

type EditorTab = 'editor' | 'preview'

export default function ResumeBuilderPage() {
  const { resumeId } = useParams<{ resumeId: string }>()
  const navigate = useNavigate()
  const { activeResume, isLoading, reorderSections } = useResume(resumeId)
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const [activeTab, setActiveTab] = useState<EditorTab>('editor')
  const [showTemplates, setShowTemplates] = useState(false)

  const activeSections = (activeResume?.sections ?? []) as ResumeSectionKey[]

  const { activeSection, goToSection, goNext, goPrev, isFirst, isLast } =
    useBuilderNavigation(activeSections)

  const { sections: validationMap, progress } = useSectionValidation(resumeId ?? '')

  const handleReorderSections = useCallback(
    (newOrder: ResumeSectionKey[]) => {
      if (!resumeId) return
      reorderSections(resumeId, newOrder)
      toast.success('Section order updated')
    },
    [resumeId, reorderSections]
  )

  if (!resumeId) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" label="Loading resume…" />
      </div>
    )
  }

  if (!activeResume) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-neutral-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-neutral-300 mb-1">Resume not found</h2>
          <p className="text-sm text-neutral-500">This resume may have been deleted or the link is invalid.</p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => { navigate(ROUTES.DASHBOARD) }}
        >
          Back to Dashboard
        </Button>
      </div>
    )
  }

  const templateId = activeResume.templateId as TemplateId
  const isCompact = isMobile || isTablet

  const editorPanel = (
    <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      {isMobile && (
        <SectionNav
          sections={activeSections}
          activeSection={activeSection}
          onSelect={goToSection}
          onReorder={handleReorderSections}
          validation={validationMap}
        />
      )}

      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto animate-fade-in" key={activeSection}>
          <SectionRenderer sectionKey={activeSection} resumeId={resumeId} />

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-800/60">
            <Button
              variant="ghost"
              size="md"
              onClick={goPrev}
              disabled={isFirst}
              leftIcon={<ChevronLeftIcon />}
            >
              Previous
            </Button>

            <span className="text-xs text-neutral-500 hidden sm:block">
              Ctrl + ↑↓ to navigate
            </span>

            <Button
              variant={isLast ? 'primary' : 'secondary'}
              size="md"
              onClick={isLast ? undefined : goNext}
              disabled={isLast}
              rightIcon={isLast ? undefined : <ChevronRightIcon />}
            >
              {isLast ? 'All sections complete' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const previewPanel = (
    <div className="flex flex-col h-full min-h-0">
      <div className="px-3 pt-3">
        <button
          type="button"
          onClick={() => { setShowTemplates(v => !v) }}
          className="w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <LayoutIcon />
            <span>Templates</span>
          </div>
          <ChevronDownIcon rotated={showTemplates} />
        </button>
      </div>
      {showTemplates && (
        <div className="px-3 pt-3 animate-fade-in">
          <TemplateSelector resumeId={resumeId} activeTemplateId={templateId} />
        </div>
      )}
      <div className="flex-1 min-h-0">
        <ResumePreview resumeId={resumeId} />
      </div>
    </div>
  )

  if (isCompact) {
    return (
      <div className="flex flex-col h-full min-h-0">
        <BuilderHeader resumeId={resumeId} progress={progress} />

        <div className="flex border-b border-neutral-800">
          <button
            type="button"
            onClick={() => { setActiveTab('editor') }}
            className={`flex-1 py-2.5 text-xs font-medium text-center transition-colors ${
              activeTab === 'editor'
                ? 'text-primary-400 border-b-2 border-primary-500'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5">
              <EditIcon />
              Editor
            </div>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('preview') }}
            className={`flex-1 py-2.5 text-xs font-medium text-center transition-colors ${
              activeTab === 'preview'
                ? 'text-primary-400 border-b-2 border-primary-500'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5">
              <EyeSmallIcon />
              Preview
            </div>
          </button>
        </div>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          {activeTab === 'editor' && (
            <>
              {!isMobile && (
                <SectionNav
                  sections={activeSections}
                  activeSection={activeSection}
                  onSelect={goToSection}
                  onReorder={handleReorderSections}
                  validation={validationMap}
                />
              )}
              {editorPanel}
            </>
          )}
          {activeTab === 'preview' && previewPanel}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <BuilderHeader resumeId={resumeId} progress={progress} />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <SectionNav
          sections={activeSections}
          activeSection={activeSection}
          onSelect={goToSection}
          onReorder={handleReorderSections}
          validation={validationMap}
        />

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="w-1/2 min-w-0 border-r border-neutral-800/60 overflow-hidden">
            {editorPanel}
          </div>
          <div className="w-1/2 min-w-0 overflow-hidden">
            {previewPanel}
          </div>
        </div>
      </div>
    </div>
  )
}

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function ChevronDownIcon({ rotated }: { rotated: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform ${rotated ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function LayoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function EyeSmallIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
