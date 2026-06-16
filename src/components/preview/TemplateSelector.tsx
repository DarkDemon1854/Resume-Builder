import { useState, useMemo, useCallback } from 'react'
import { listTemplates } from '@/templates'
import { useResumeStore } from '@/store/resumeStore'
import type { TemplateId } from '@/constants'

type Props = {
  resumeId: string
  activeTemplateId: TemplateId
}

const TAG_FILTERS = ['All', 'Single-column', 'Two-column', 'ATS', 'Creative', 'Minimal', 'Modern', 'Professional'] as const

export default function TemplateSelector({ resumeId, activeTemplateId }: Props) {
  const updateResume = useResumeStore(state => state.updateResume)
  const [activeTag, setActiveTag] = useState<string>('All')

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
              <div
                className="w-full aspect-[210/297] rounded-sm"
                style={{
                  background: `linear-gradient(135deg, ${t.meta.previewColor} 0%, ${t.meta.previewColor}99 50%, ${t.meta.previewColor}55 100%)`,
                }}
              >
                <div className="h-full w-full flex flex-col justify-between p-2">
                  <div className="space-y-1">
                    <div className="h-1.5 w-3/4 rounded-full bg-white/30" />
                    <div className="h-1 w-1/2 rounded-full bg-white/20" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="h-0.5 w-full rounded-full bg-white/15" />
                    <div className="h-0.5 w-4/5 rounded-full bg-white/15" />
                    <div className="h-0.5 w-3/5 rounded-full bg-white/10" />
                  </div>
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
