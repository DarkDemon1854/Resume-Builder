import { useState, useEffect, useRef } from 'react'

type TransitionState = 'idle' | 'leaving' | 'entering'

export function useTemplateTransition(templateId: string) {
  const [transitionState, setTransitionState] = useState<TransitionState>('idle')
  const [displayedTemplateId, setDisplayedTemplateId] = useState(templateId)
  const pendingId = useRef<string>(templateId)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (templateId === displayedTemplateId) return

    pendingId.current = templateId

    if (timerRef.current) clearTimeout(timerRef.current)

    setTransitionState('leaving')

    timerRef.current = setTimeout(() => {
      setDisplayedTemplateId(pendingId.current)
      setTransitionState('entering')

      timerRef.current = setTimeout(() => {
        setTransitionState('idle')
      }, 250)
    }, 180)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [templateId, displayedTemplateId])

  return {
    displayedTemplateId,
    transitionState,
    isSwitching: transitionState !== 'idle',
  }
}
