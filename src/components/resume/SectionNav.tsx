import { useCallback, useRef, useState, type DragEvent } from 'react'
import { SECTION_META, type ResumeSectionKey, type SectionIconName } from '@/constants'
import { useIsMobile } from '@/hooks/useMediaQuery'
import Button from '@/components/Button'

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

type DragState = {
  dragKey: ResumeSectionKey
  overKey: ResumeSectionKey | null
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
  const [drag, setDrag] = useState<DragState | null>(null)

  const ordered = drag
    ? (() => {
        const arr = [...sections]
        const fromIdx = arr.indexOf(drag.dragKey)
        const toIdx = drag.overKey ? arr.indexOf(drag.overKey) : fromIdx
        if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return arr
        const [moved] = arr.splice(fromIdx, 1)
        arr.splice(toIdx, 0, moved)
        return arr
      })()
    : sections

  const handleDragStart = useCallback((_e: DragEvent, key: ResumeSectionKey) => {
    setDrag({ dragKey: key, overKey: null })
  }, [])

  const handleDragOver = useCallback((e: DragEvent, key: ResumeSectionKey) => {
    e.preventDefault()
    setDrag((prev) => (prev ? { ...prev, overKey: key } : null))
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      if (!drag) return
      const arr = [...sections]
      const fromIdx = arr.indexOf(drag.dragKey)
      const toIdx = drag.overKey ? arr.indexOf(drag.overKey) : fromIdx
      if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
        const [moved] = arr.splice(fromIdx, 1)
        arr.splice(toIdx, 0, moved)
        onReorder(arr)
      }
      setDrag(null)
    },
    [drag, sections, onReorder]
  )

  const handleDragEnd = useCallback(() => { setDrag(null) }, [])

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

  return (
    <nav
      className="w-64 shrink-0 border-r border-neutral-800/60 bg-neutral-900/50 overflow-y-auto h-full"
      aria-label="Resume sections"
    >
      <div className="p-3 flex flex-col gap-0.5">
        <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Sections
        </p>

        {ordered.map((key, idx) => {
          const meta = SECTION_META[key]
          const status = validation[key]
          const isActive = key === activeSection
          const isDragging = drag?.dragKey === key

          return (
            <div
              key={key}
              draggable
              onDragStart={(e) => { handleDragStart(e, key) }}
              onDragOver={(e) => { handleDragOver(e, key) }}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              className={[
                'group relative flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 select-none',
                isDragging ? 'opacity-40' : '',
                isActive
                  ? 'bg-primary-500/12 text-primary-300'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => { onSelect(key) }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(key)
                } else if (e.altKey && e.key === 'ArrowUp') {
                  e.preventDefault()
                  moveUp(idx)
                } else if (e.altKey && e.key === 'ArrowDown') {
                  e.preventDefault()
                  moveDown(idx)
                }
              }}
              aria-current={isActive ? 'true' : undefined}
            >
              {isActive && (
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
            </div>
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

type SectionIconProps = {
  name: SectionIconName
  size?: number
}

function SectionIcon({ name, size = 16 }: SectionIconProps) {
  const props = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'user':
      return (
        <svg {...props}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    case 'file-text':
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    case 'briefcase':
      return (
        <svg {...props}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    case 'graduation':
      return (
        <svg {...props}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      )
    case 'sparkle':
      return (
        <svg {...props}>
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
          <path d="M5 20l.7-2 2-.7-2-.7L5 14l-.7 2.6-2 .7 2 .7z" />
        </svg>
      )
    case 'code':
      return (
        <svg {...props}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    case 'badge':
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    case 'trophy':
      return (
        <svg {...props}>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      )
    default:
      return null
  }
}
