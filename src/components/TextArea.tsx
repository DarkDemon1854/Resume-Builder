import { forwardRef, useId } from 'react'

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
  hint?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const generatedId = useId()
    const textareaId = id ?? generatedId

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="label-base">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={[
            'input-base min-h-[100px] resize-y',
            error
              ? 'border-danger-500/70 focus:border-danger-500/70 focus:ring-danger-500/20'
              : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-danger-400 flex items-center gap-1">
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
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${textareaId}-hint`} className="text-xs text-neutral-500">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'

export default TextArea
