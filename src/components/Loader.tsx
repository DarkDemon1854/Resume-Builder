type LoaderProps = {
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
  label?: string
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
}

export default function Loader({ size = 'md', fullScreen = false, label }: LoaderProps) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={[
          'animate-spin rounded-full border-neutral-700/50 border-t-primary-500',
          sizeClasses[size],
        ].join(' ')}
        role="status"
        aria-label="Loading"
      />
      {label && <p className="text-sm text-neutral-400 font-medium animate-pulse">{label}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
        {spinner}
      </div>
    )
  }

  return spinner
}
