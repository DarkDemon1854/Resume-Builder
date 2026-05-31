import Loader from '@/components/Loader'

type GlobalLoaderProps = {
  visible: boolean
  label?: string
}

export default function GlobalLoader({ visible, label }: GlobalLoaderProps) {
  if (!visible) return null

  return (
    <div
      role="status"
      aria-label={label ?? 'Loading'}
      aria-live="polite"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-neutral-950/75 backdrop-blur-sm animate-fade-in"
    >
      <Loader size="lg" label={label} />
    </div>
  )
}
