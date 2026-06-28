import { useState, useEffect, useRef } from 'react'

type TransitionState = 'idle' | 'leaving' | 'entering'

const LEAVE_DURATION_MS = 180
const ENTER_DURATION_MS = 250

export function useTemplateTransition(templateId: string) {
  const [transitionState, setTransitionState] = useState<TransitionState>('idle')
  const [displayedTemplateId, setDisplayedTemplateId] = useState(templateId)
  const committedId = useRef(templateId)
  const pendingId = useRef(templateId)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (templateId === committedId.current) return

    pendingId.current = templateId

    if (leaveTimer.current !== null) {
      clearTimeout(leaveTimer.current)
      leaveTimer.current = null
    }
    if (enterTimer.current !== null) {
      clearTimeout(enterTimer.current)
      enterTimer.current = null
    }

    setTransitionState('leaving')

    leaveTimer.current = setTimeout(() => {
      leaveTimer.current = null
      const next = pendingId.current
      committedId.current = next
      setDisplayedTemplateId(next)
      setTransitionState('entering')

      enterTimer.current = setTimeout(() => {
        enterTimer.current = null
        setTransitionState('idle')
      }, ENTER_DURATION_MS)
    }, LEAVE_DURATION_MS)

    return () => {
      if (leaveTimer.current !== null) {
        clearTimeout(leaveTimer.current)
        leaveTimer.current = null
      }
      if (enterTimer.current !== null) {
        clearTimeout(enterTimer.current)
        enterTimer.current = null
      }
    }
  }, [templateId])

  return {
    displayedTemplateId,
    transitionState,
    isSwitching: transitionState !== 'idle',
  }
}
