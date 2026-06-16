const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const CURRENT_YEAR = new Date().getFullYear()
const YEARS: number[] = []
for (let y = CURRENT_YEAR + 2; y >= 1950; y--) {
  YEARS.push(y)
}

type Props = {
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  disabled?: boolean
}

export default function MonthYearPicker({ label, value, onChange, onBlur, error, disabled }: Props) {
  const parts = value ? value.split('-') : []
  const selectedYear = parts[0] ?? ''
  const selectedMonth = parts[1] ?? ''

  const handleYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const y = e.target.value
    const m = selectedMonth || '01'
    onChange(y ? `${y}-${m}` : '')
  }

  const handleMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const m = e.target.value
    const y = selectedYear || String(CURRENT_YEAR)
    onChange(m ? `${y}-${m}` : '')
  }

  const selectClass = [
    'flex-1 rounded-lg border bg-neutral-900 px-3 py-2 text-sm text-neutral-100',
    'focus:outline-none focus:border-primary-500/70 focus:ring-2 focus:ring-primary-500/20',
    'transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
    error ? 'border-danger-500/60' : 'border-neutral-700',
  ].join(' ')

  return (
    <div className="flex flex-col gap-1.5">
      <span className="label-base">{label}</span>
      <div className="flex gap-2">
        <select
          value={selectedMonth}
          onChange={handleMonth}
          onBlur={onBlur}
          disabled={disabled}
          className={selectClass}
          aria-label={`${label} month`}
        >
          <option value="">Month</option>
          {MONTHS.map((m, i) => {
            const val = String(i + 1).padStart(2, '0')
            return <option key={val} value={val}>{m}</option>
          })}
        </select>
        <select
          value={selectedYear}
          onChange={handleYear}
          onBlur={onBlur}
          disabled={disabled}
          className={selectClass}
          style={{ maxWidth: '7rem' }}
          aria-label={`${label} year`}
        >
          <option value="">Year</option>
          {YEARS.map(y => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </select>
      </div>
      {error && <p className="text-xs text-danger-400">{error}</p>}
    </div>
  )
}
