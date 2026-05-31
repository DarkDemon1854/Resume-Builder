type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  glass?: boolean
  hover?: boolean
}

const paddingStyles = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({
  children,
  padding = 'md',
  glass = false,
  hover = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={[
        'rounded-xl border',
        glass
          ? 'glass'
          : 'bg-neutral-900/70 border-neutral-800',
        hover
          ? 'transition-all duration-200 hover:border-neutral-700 hover:shadow-card cursor-pointer'
          : '',
        paddingStyles[padding],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
