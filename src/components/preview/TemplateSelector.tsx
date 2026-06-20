import { useState, useMemo, useCallback } from 'react'
import { listTemplates } from '@/templates'
import { useResumeStore } from '@/store/resumeStore'
import type { TemplateId } from '@/constants'
import { MOCK_RESUME } from '@/utils/mock-resume'
import { normalizeResume } from '@/templates/normalize'

type Props = {
  resumeId: string
  activeTemplateId: TemplateId
}

const TAG_FILTERS = ['All', 'Single-column', 'Two-column', 'ATS', 'Creative', 'Minimal', 'Modern', 'Professional'] as const

export default function TemplateSelector({ resumeId, activeTemplateId }: Props) {
  const updateResume = useResumeStore(state => state.updateResume)
  const [activeTag, setActiveTag] = useState<typeof TAG_FILTERS[number]>('All')

  const allTemplates = useMemo(() => listTemplates(), [])

  const filtered = useMemo(() => {
    if (activeTag === 'All') return allTemplates
    return allTemplates.filter(t => t.meta.tags.includes(activeTag))
  }, [allTemplates, activeTag])

  const handleSelect = useCallback(
    (id: TemplateId) => {
      updateResume(resumeId, { templateId: id })
    },
    [resumeId, updateResume]
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-1">
        {TAG_FILTERS.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => { setActiveTag(tag) }}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeTag === tag
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 max-h-[280px] overflow-y-auto no-scrollbar px-1 pb-1">
        {filtered.map(t => {
          const isActive = t.meta.id === activeTemplateId
          return (
            <button
              key={t.meta.id}
              type="button"
              onClick={() => { handleSelect(t.meta.id) }}
              className={`group relative flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all ${
                isActive
                  ? 'bg-primary-600/15 ring-2 ring-primary-500'
                  : 'bg-neutral-900 hover:bg-neutral-800 ring-1 ring-neutral-800 hover:ring-neutral-700'
              }`}
            >
              <div className="w-full aspect-[210/297] rounded-sm bg-neutral-900 overflow-hidden relative border border-neutral-700/50 group-hover:border-neutral-500/50 transition-colors">
                <div className="absolute top-0 left-1/2 w-[794px] h-[1123px] origin-top pointer-events-none bg-white" style={{ transform: 'translateX(-50%) scale(0.08)' }}>
                  <t.component resume={normalizeResume(MOCK_RESUME)} />
                </div>
              </div>
              <span
                className={`text-[10px] font-medium leading-tight truncate max-w-full ${
                  isActive ? 'text-primary-300' : 'text-neutral-400 group-hover:text-neutral-200'
                }`}
              >
                {t.meta.name}
              </span>
              {isActive && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
