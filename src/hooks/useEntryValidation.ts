import { useState, useCallback } from 'react'

export function useEntryValidation<T extends { id: string }>(
  validateFn: (entry: T) => { errors: { field: string; message: string }[] }
) {
  const [entryErrors, setEntryErrors] = useState<Partial<Record<string, Record<string, string>>>>({})
  const [touched, setTouched] = useState<Partial<Record<string, Partial<Record<string, boolean>>>>>({})

  const handleBlur = useCallback(
    (entry: T, field: string) => {
      setTouched(prev => ({
        ...prev,
        [entry.id]: { ...(prev[entry.id] ?? {}), [field]: true },
      }))

      const result = validateFn(entry)
      const fieldErrors: Record<string, string> = {}
      result.errors.forEach(e => {
        fieldErrors[e.field] = e.message
      })
      setEntryErrors(prev => ({ ...prev, [entry.id]: fieldErrors }))
    },
    [validateFn]
  )

  const getErr = useCallback(
    (id: string, field: string): string | undefined => {
      const touchedEntry = touched[id]
      if (touchedEntry?.[field] !== true) return undefined
      return entryErrors[id]?.[field]
    },
    [touched, entryErrors]
  )

  return { handleBlur, getErr }
}
