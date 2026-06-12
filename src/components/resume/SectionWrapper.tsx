import type { ReactNode } from 'react'

type SectionWrapperProps = {
  title: string
  description?: string
  icon?: ReactNode
  actions?: ReactNode
  children: ReactNode
}

export default function SectionWrapper({
  title,
  description,
  icon,
  actions,
  children,
}: SectionWrapperProps) {
  return (
    <section className="flex flex-col gap-0 rounded-xl border border-neutral-800 bg-neutral-900/70 overflow-hidden">
      <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-neutral-800/80">
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <span className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-primary-600/15 text-primary-400">
              {icon}
            </span>
          )}
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-neutral-100 leading-tight">{title}</h2>
            {description && (
              <p className="text-xs text-neutral-500 mt-0.5 leading-snug">{description}</p>
            )}
          </div>
        </div>
        {actions && <div className="shrink-0 flex items-center gap-2">{actions}</div>}
      </div>
      <div className="px-6 py-5">{children}</div>
    </section>
  )
}
