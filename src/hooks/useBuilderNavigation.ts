import { useCallback, useEffect, useMemo } from 'react'
import { useUIStore } from '@/store/uiStore'
import { RESUME_SECTIONS, type ResumeSectionKey } from '@/constants'

export function useBuilderNavigation(activeSections: ResumeSectionKey[]) {
  const activeSection = useUIStore((s) => s.builderActiveSection)
  const setActiveSection = useUIStore((s) => s.setBuilderActiveSection)

  const sections = useMemo(
    () => (activeSections.length > 0 ? activeSections : [...RESUME_SECTIONS]),
    [activeSections]
  )

  useEffect(() => {
    if (!sections.includes(activeSection)) {
      setActiveSection(sections[0])
    }
  }, [sections, activeSection, setActiveSection])

  const goToSection = useCallback(
    (section: ResumeSectionKey) => {
      if (sections.includes(section)) {
        setActiveSection(section)
      }
    },
    [sections, setActiveSection]
  )

  const goNext = useCallback(() => {
    const idx = sections.indexOf(activeSection)
    if (idx < sections.length - 1) {
      setActiveSection(sections[idx + 1])
    }
  }, [sections, activeSection, setActiveSection])

  const goPrev = useCallback(() => {
    const idx = sections.indexOf(activeSection)
    if (idx > 0) {
      setActiveSection(sections[idx - 1])
    }
  }, [sections, activeSection, setActiveSection])

  const isFirst = sections.indexOf(activeSection) === 0
  const isLast = sections.indexOf(activeSection) === sections.length - 1

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) return

      const active = document.activeElement as HTMLElement
      const isInputFocused =
        active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.tagName === 'SELECT' ||
        active.isContentEditable

      if (isInputFocused) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        goPrev()
      }
    }
    document.addEventListener('keydown', handler)
    return () => { document.removeEventListener('keydown', handler) }
  }, [goNext, goPrev])

  return {
    activeSection,
    sections,
    goToSection,
    goNext,
    goPrev,
    isFirst,
    isLast,
  }
}
