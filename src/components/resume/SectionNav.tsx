import { useCallback, useRef, useState, useEffect, type DragEvent } from 'react'
import { SECTION_META, type ResumeSectionKey } from '@/constants'
import { useIsMobile } from '@/hooks/useMediaQuery'
import Button from '@/components/Button'
import SectionIcon from '@/components/SectionIcon'

type SectionStatus = {
  valid: boolean
  errorCount: number
}

type Props = {
  sections: ResumeSectionKey[]
  activeSection: ResumeSectionKey
  onSelect: (section: ResumeSectionKey) => void
  onReorder: (sections: ResumeSectionKey[]) => void
  validation: Record<ResumeSectionKey, SectionStatus>
}

export default function SectionNav({ sections, activeSection, onSelect, onReorder, validation }: Props) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <MobileNav
        sections={sections}
        activeSection={activeSection}
        onSelect={onSelect}
        validation={validation}
      />
    )
  }

  return (
    <DesktopNav
      sections={sections}
      activeSection={activeSection}
      onSelect={onSelect}
      onReorder={onReorder}
      validation={validation}
    />
  )
}

type MobileNavProps = Omit<Props, 'onReorder'>

function MobileNav({ sections, activeSection, onSelect, validation }: MobileNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      const activeBtn = scrollRef.current.querySelector('[aria-current="true"]')
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [activeSection])

  return (
    <div
      ref={scrollRef}
      className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto no-scrollbar border-b border-neutral-800/60 bg-neutral-900/80 backdrop-blur-md sticky top-[52px] z-10"
    >
      {sections.map((key) => {
        const meta = SECTION_META[key]
        const status = validation[key]
        const isActive = key === activeSection

        return (
          <button
            key={key}
            type="button"
            onClick={() => { onSelect(key) }}
            className={[
              'shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap',
              isActive
                ? 'bg-primary-500/15 text-primary-300 shadow-glow-sm'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60',
            ].join(' ')}
          >
            <SectionIcon name={meta.icon} size={14} />
            <span>{meta.label}</span>
            <StatusDot valid={status.valid} />
          </button>
        )
      })}
    </div>
  )
}

type DesktopNavProps = Props

function DesktopNav({ sections, activeSection, onSelect, onReorder, validation }: DesktopNavProps) {
  const [dragKey, setDragKey] = useState<ResumeSectionKey | null>(null)
  const [overKey, setOverKey] = useState<ResumeSectionKey | null>(null)
  const lastOverKey = useRef<ResumeSectionKey | null>(null)

  const handleDragStart = useCallback((e: DragEvent, key: ResumeSectionKey) => {
    e.dataTransfer.effectAllowed = 'move'
    setDragKey(key)
    setOverKey(null)
    lastOverKey.current = null
  }, [])

  const handleDragOver = useCallback((e: DragEvent, key: ResumeSectionKey) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (lastOverKey.current === key) return
    lastOverKey.current = key
    setOverKey(key)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent, key: ResumeSectionKey) => {
    const related = e.relatedTarget as HTMLElement | null
    if (related?.closest(`[data-section="${key}"]`)) return
    if (lastOverKey.current === key) {
      lastOverKey.current = null
      setOverKey(null)
    }
  }, [])

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    if (dragKey && overKey && dragKey !== overKey) {
      const arr = [...sections]
      const fromIdx = arr.indexOf(dragKey)
      const toIdx = arr.indexOf(overKey)
      if (fromIdx !== -1 && toIdx !== -1) {
        const item = arr[fromIdx]
        const next = arr.filter((_, i) => i !== fromIdx)
        next.splice(toIdx, 0, item)
        onReorder(next)
      }
    }
    setDragKey(null)
    setOverKey(null)
    lastOverKey.current = null
  }, [dragKey, overKey, sections, onReorder])

  const handleDragEnd = useCallback(() => {
    setDragKey(null)
    setOverKey(null)
    lastOverKey.current = null
  }, [])

  const moveUp = useCallback(
    (idx: number) => {
      if (idx <= 0) return
      const arr = [...sections]
      ;[arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
      onReorder(arr)
    },
    [sections, onReorder]
  )

  const moveDown = useCallback(
    (idx: number) => {
      if (idx >= sections.length - 1) return
      const arr = [...sections]
      ;[arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
      onReorder(arr)
    },
    [sections, onReorder]
  )

  const isDraggingAny = dragKey !== null

  return (
    <nav
      className="w-64 shrink-0 border-r border-neutral-800/60 bg-neutral-900/50 overflow-y-auto h-full"
      aria-label="Resume sections"
    >
      <div className="p-3 flex flex-col gap-0.5">
        <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Sections
        </p>

        {sections.map((key, idx) => {
          const meta = SECTION_META[key]
          const status = validation[key]
          const isActive = key === activeSection
          const isDragging = key === dragKey
          const isOver = key === overKey && key !== dragKey

          return (
            <button
              type="button"
              key={key}
              data-section={key}
              draggable
              onDragStart={(e) => { handleDragStart(e, key) }}
              onDragOver={(e) => { handleDragOver(e, key) }}
              onDragLeave={(e) => { handleDragLeave(e, key) }}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              className={[
                'group relative flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer select-none',
                isDraggingAny ? 'transition-none' : 'transition-colors duration-150',
                isDragging ? 'opacity-30' : '',
                isOver ? 'ring-2 ring-primary-500/60 bg-primary-500/8' : '',
                isActive && !isDragging
                  ? 'bg-primary-500/12 text-primary-300'
                  : !isDragging && !isOver
                  ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                  : 'text-neutral-400',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => { onSelect(key) }}
              onKeyDown={(e) => {
                if (e.altKey && e.key === 'ArrowUp') {
                  e.preventDefault()
                  moveUp(idx)
                } else if (e.altKey && e.key === 'ArrowDown') {
                  e.preventDefault()
                  moveDown(idx)
                }
              }}
              aria-current={isActive ? 'true' : undefined}
            >
              {isActive && !isDragging && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary-500" />
              )}

              <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800/60 group-hover:bg-neutral-800 transition-colors">
                <SectionIcon name={meta.icon} size={16} />
              </span>

              <span className="flex-1 text-sm font-medium truncate">{meta.label}</span>

              <StatusBadge valid={status.valid} errorCount={status.errorCount} />

              <span className="shrink-0 opacity-0 group-hover:opacity-40 cursor-grab active:cursor-grabbing transition-opacity">
                <GripIcon />
              </span>
            </button>
          )
        })}
      </div>

      <div className="p-3 border-t border-neutral-800/40">
        <Button variant="ghost" size="sm" fullWidth onClick={() => { onSelect(sections[0]) }}>
          <RewindIcon />
          Go to first section
        </Button>
      </div>
    </nav>
  )
}

function StatusDot({ valid }: { valid: boolean }) {
  return (
    <span
      className={[
        'w-1.5 h-1.5 rounded-full shrink-0',
        valid ? 'bg-success-500' : 'bg-warning-500',
      ].join(' ')}
    />
  )
}

function StatusBadge({ valid, errorCount }: { valid: boolean; errorCount: number }) {
  if (valid) {
    return (
      <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-success-500/15 text-success-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    )
  }

  if (errorCount === 0) return null

  return (
    <span className="shrink-0 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-warning-500/15 text-warning-400 text-[10px] font-bold tabular-nums">
      {errorCount}
    </span>
  )
}

function GripIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="5" r="1" fill="currentColor" />
      <circle cx="9" cy="12" r="1" fill="currentColor" />
      <circle cx="9" cy="19" r="1" fill="currentColor" />
      <circle cx="15" cy="5" r="1" fill="currentColor" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
      <circle cx="15" cy="19" r="1" fill="currentColor" />
    </svg>
  )
}

function RewindIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 19 2 12 11 5 11 19" />
      <polygon points="22 19 13 12 22 5 22 19" />
    </svg>
  )
}
