import { useRef, useState, useCallback, useId, type KeyboardEvent } from 'react'

type TagInputProps = {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  error?: string
  id?: string
  label?: string
}

export default function TagInput({
  value,
  onChange,
  placeholder = 'Type and press Enter',
  error,
  id,
  label,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const uid = useId()
  const inputId = id ?? uid

  const addTag = useCallback(
    (raw: string) => {
      const trimmed = raw.trim().replace(/,+$/, '')
      if (!trimmed || value.includes(trimmed)) return
      onChange([...value, trimmed])
    },
    [value, onChange]
  )

  const removeTag = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index))
    },
    [value, onChange]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
        e.preventDefault()
        addTag(inputValue)
        setInputValue('')
        return
      }
      if (e.key === 'Backspace' && !inputValue && value.length > 0) {
        removeTag(value.length - 1)
      }
    },
    [inputValue, value, addTag, removeTag]
  )

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val.endsWith(',')) {
      addTag(val.slice(0, -1))
      setInputValue('')
    } else {
      setInputValue(val)
    }
  }, [addTag])

  const handleBlur = useCallback(() => {
    if (inputValue.trim()) {
      addTag(inputValue)
      setInputValue('')
    }
  }, [inputValue, addTag])

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="label-base">
          {label}
        </label>
      )}
      <div
        className={[
          'flex flex-wrap gap-1.5 min-h-[2.75rem] w-full rounded-lg border px-3 py-2',
          'bg-neutral-900 transition-all duration-150',
          'focus-within:border-primary-500/70 focus-within:ring-2 focus-within:ring-primary-500/20',
          error
            ? 'border-danger-500/70 focus-within:border-danger-500/70 focus-within:ring-danger-500/20'
            : 'border-neutral-700',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag, i) => (
          <span
            key={`${tag}-${String(i)}`}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-primary-600/20 text-primary-300 border border-primary-500/30"
          >
            {tag}
            <button
              type="button"
              onClick={() => { removeTag(i); }}
              className="text-primary-400 hover:text-primary-200 transition-colors leading-none"
              aria-label={`Remove ${tag}`}
            >
              <XIcon />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 outline-none border-none"
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-tag-error` : undefined}
        />
      </div>
      {error && (
        <p id={`${inputId}-tag-error`} className="text-xs text-danger-400 flex items-center gap-1">
          <ErrorIcon />
          {error}
        </p>
      )}
    </div>
  )
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      width="12"
      height="12"
      className="shrink-0"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
        clipRule="evenodd"
      />
    </svg>
  )
}
