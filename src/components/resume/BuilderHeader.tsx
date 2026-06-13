import { useState, useCallback, useRef, useEffect, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResume } from '@/hooks/useResume'
import { ROUTES } from '@/constants'
import Button from '@/components/Button'
import Modal from '@/components/Modal'

type Props = {
  resumeId: string
  progress: number
}

export default function BuilderHeader({ resumeId, progress }: Props) {
  const navigate = useNavigate()
  const { activeResume, updateResume, resetResume } = useResume(resumeId)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(activeResume?.title ?? '')
  const [showReset, setShowReset] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (activeResume) {
      setTitle(activeResume.title)
    }
  }, [activeResume])

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  const commitTitle = useCallback(() => {
    const trimmed = title.trim()
    if (trimmed && trimmed !== activeResume?.title) {
      updateResume(resumeId, { title: trimmed })
    } else {
      setTitle(activeResume?.title ?? '')
    }
    setEditing(false)
  }, [title, activeResume?.title, resumeId, updateResume])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        commitTitle()
      } else if (e.key === 'Escape') {
        setTitle(activeResume?.title ?? '')
        setEditing(false)
      }
    },
    [commitTitle, activeResume?.title]
  )

  const handleReset = useCallback(() => {
    resetResume(resumeId)
    setShowReset(false)
  }, [resumeId, resetResume])

  return (
    <>
      <header className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b border-neutral-800/60 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            type="button"
            onClick={() => { navigate(ROUTES.DASHBOARD) }}
            className="shrink-0 p-2 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60 transition-colors"
            aria-label="Back to dashboard"
          >
            <ArrowLeftIcon />
          </button>

          {editing ? (
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value) }}
              onBlur={commitTitle}
              onKeyDown={handleKeyDown}
              className="input-base text-base font-semibold py-1 px-2 max-w-xs"
              aria-label="Resume title"
            />
          ) : (
            <button
              type="button"
              onClick={() => { setEditing(true) }}
              className="text-base font-semibold text-neutral-100 hover:text-primary-300 transition-colors truncate max-w-xs text-left"
              title="Click to edit title"
            >
              {activeResume?.title ?? 'Untitled Resume'}
            </button>
          )}

          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-500 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
            Auto-saved
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 h-1.5 rounded-full bg-neutral-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
                style={{ width: `${String(progress)}%` }}
              />
            </div>
            <span className="text-xs text-neutral-400 tabular-nums">{progress}%</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setShowReset(true) }}
          >
            Reset
          </Button>
        </div>
      </header>

      <Modal
        isOpen={showReset}
        onClose={() => { setShowReset(false) }}
        title="Reset Resume"
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-neutral-300">
            This will clear all sections and reset to defaults. This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={() => { setShowReset(false) }}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleReset}>
              Reset Everything
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  )
}
