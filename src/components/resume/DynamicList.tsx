import { useState, useCallback, type ReactNode } from 'react'
import Button from '@/components/Button'

type DynamicListProps<T extends { id: string }> = {
  items: T[]
  onAdd: () => void
  onRemove: (id: string) => void
  onReorder: (orderedIds: string[]) => void
  renderItem: (item: T, index: number) => ReactNode
  emptyLabel: string
  addLabel: string
}

type DragState = {
  dragId: string
  overId: string | null
}

export default function DynamicList<T extends { id: string }>({
  items,
  onAdd,
  onRemove,
  onReorder,
  renderItem,
  emptyLabel,
  addLabel,
}: DynamicListProps<T>) {
  const [drag, setDrag] = useState<DragState | null>(null)
  const [pendingRemove, setPendingRemove] = useState<string | null>(null)


  const ordered = drag
    ? (() => {
        const arr = [...items]
        const fromIdx = arr.findIndex(i => i.id === drag.dragId)
        const toIdx = drag.overId ? arr.findIndex(i => i.id === drag.overId) : fromIdx
        if (fromIdx === -1 || toIdx === -1) return arr
        const [moved] = arr.splice(fromIdx, 1)
        arr.splice(toIdx, 0, moved)
        return arr
      })()
    : items

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: string) => {
      e.dataTransfer.effectAllowed = 'move'
      setDrag({ dragId: id, overId: null })
    },
    []
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: string) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      setDrag(prev => (prev ? { ...prev, overId: id } : null))
    },
    []
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (!drag) return
      const arr = [...items]
      const fromIdx = arr.findIndex(i => i.id === drag.dragId)
      const toIdx = drag.overId ? arr.findIndex(i => i.id === drag.overId) : fromIdx
      if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
        const [moved] = arr.splice(fromIdx, 1)
        arr.splice(toIdx, 0, moved)
        onReorder(arr.map(i => i.id))
      }
      setDrag(null)
    },
    [drag, items, onReorder]
  )

  const handleDragEnd = useCallback(() => { setDrag(null); }, [])

  const moveUp = useCallback(
    (id: string) => {
      const idx = items.findIndex(i => i.id === id)
      if (idx <= 0) return
      const arr = [...items]
      ;[arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
      onReorder(arr.map(i => i.id))
    },
    [items, onReorder]
  )

  const moveDown = useCallback(
    (id: string) => {
      const idx = items.findIndex(i => i.id === id)
      if (idx === -1 || idx >= items.length - 1) return
      const arr = [...items]
      ;[arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
      onReorder(arr.map(i => i.id))
    },
    [items, onReorder]
  )
  const requestRemove = useCallback((id: string) => { setPendingRemove(id); }, [])
  const confirmRemove = useCallback(() => {
    if (pendingRemove) {
      onRemove(pendingRemove)
      setPendingRemove(null)
    }
  }, [pendingRemove, onRemove])

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 rounded-lg border border-dashed border-neutral-700 bg-neutral-900/40">
        <span className="text-sm text-neutral-500">{emptyLabel}</span>
        <Button size="sm" variant="secondary" onClick={onAdd}>
          <PlusIcon />
          {addLabel}
        </Button>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col gap-3"
      role="list"
      aria-label="Reorderable items"
      aria-live="polite"
      aria-atomic="false"
    >
      {pendingRemove && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-danger-500/40 bg-danger-600/10 animate-fade-in">
          <span className="text-sm text-danger-300">Remove this entry?</span>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => { setPendingRemove(null); }}>
              Cancel
            </Button>
            <Button size="sm" variant="danger" onClick={confirmRemove}>
              Remove
            </Button>
          </div>
        </div>
      )}

      {ordered.map((item, index) => {
        const isDragging = drag?.dragId === item.id
        const isOver = drag?.overId === item.id && drag.dragId !== item.id
        const isFirst = index === 0
        const isLast = index === ordered.length - 1
        return (
          <div
            key={item.id}
            role="listitem"
            aria-roledescription="reorderable item"
            aria-label={`Item ${String(index + 1)} of ${String(ordered.length)}`}
            draggable
            onDragStart={e => { handleDragStart(e, item.id); }}
            onDragOver={e => { handleDragOver(e, item.id); }}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            className={[
              'group relative rounded-lg border transition-all duration-150',
              isDragging
                ? 'opacity-40 border-primary-500/50 bg-neutral-800/60'
                : 'border-neutral-800 bg-neutral-900/50',
              isOver ? 'border-primary-500/70 shadow-glow-sm' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {/* Drag handle (mouse) */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-40 cursor-grab active:cursor-grabbing transition-opacity z-10">
              <GripIcon />
            </div>

            {/* Keyboard reorder buttons */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity z-10 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
              <button
                type="button"
                onClick={() => { moveUp(item.id); }}
                disabled={isFirst}
                className="p-0.5 rounded text-neutral-500 hover:text-primary-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500"
                aria-label={`Move item ${String(index + 1)} up`}
              >
                <ChevronUpIcon />
              </button>
              <button
                type="button"
                onClick={() => { moveDown(item.id); }}
                disabled={isLast}
                className="p-0.5 rounded text-neutral-500 hover:text-primary-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500"
                aria-label={`Move item ${String(index + 1)} down`}
              >
                <ChevronDownIcon />
              </button>
            </div>

            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                type="button"
                onClick={() => { requestRemove(item.id); }}
                className="p-1.5 rounded-md text-neutral-500 hover:text-danger-400 hover:bg-danger-500/10 transition-colors"
                aria-label="Remove entry"
              >
                <TrashIcon />
              </button>
            </div>
            <div className="pl-8 pr-10 py-4">{renderItem(item, index)}</div>
          </div>
        )
      })}

      <Button size="sm" variant="secondary" onClick={onAdd} className="self-start mt-1">
        <PlusIcon />
        {addLabel}
      </Button>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}

function GripIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="5" r="1" fill="currentColor" />
      <circle cx="9" cy="12" r="1" fill="currentColor" />
      <circle cx="9" cy="19" r="1" fill="currentColor" />
      <circle cx="15" cy="5" r="1" fill="currentColor" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
      <circle cx="15" cy="19" r="1" fill="currentColor" />
    </svg>
  )
}

function ChevronUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
