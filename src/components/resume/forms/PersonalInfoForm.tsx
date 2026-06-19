import { useCallback, useEffect, useRef, useState } from 'react'
import Input from '@/components/Input'
import SectionWrapper from '@/components/resume/SectionWrapper'
import { useResume } from '@/hooks/useResume'
import { validatePersonalInfo } from '@/validation/resumeValidation'
import type { PersonalInfo } from '@/types/resume'
import { AUTOSAVE_DELAY_MS } from '@/constants'

type Props = { resumeId: string }

type Errors = Partial<Record<keyof PersonalInfo, string>>

function getError(errors: Errors, field: keyof PersonalInfo) {
  return errors[field]
}

export default function PersonalInfoForm({ resumeId }: Props) {
  const { activeResume, updatePersonalInfo } = useResume(resumeId)
  const info = activeResume?.personalInfo

  const [draft, setDraft] = useState<PersonalInfo | null>(info ?? null)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof PersonalInfo, boolean>>>({})
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (info) {
      setDraft(info)
      setErrors({})
      setTouched({})
    }
  }, [resumeId, info])

  const flush = useCallback(
    (updated: PersonalInfo) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        updatePersonalInfo(resumeId, updated)
      }, AUTOSAVE_DELAY_MS)
    },
    [resumeId, updatePersonalInfo]
  )

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const change = useCallback(
    (field: keyof PersonalInfo, value: string) => {
      setDraft(prev => {
        if (!prev) return prev
        const next = { ...prev, [field]: value }
        flush(next)
        return next
      })
    },
    [flush]
  )

  const blur = useCallback(
    (field: keyof PersonalInfo) => {
      setTouched(prev => ({ ...prev, [field]: true }))
      if (!draft) return
      const result = validatePersonalInfo(draft)
      const fieldErrors: Errors = {}
      result.errors.forEach(e => {
        fieldErrors[e.field as keyof PersonalInfo] = e.message
      })
      setErrors(fieldErrors)
    },
    [draft]
  )

  if (!draft) return null

  return (
    <SectionWrapper
      title="Personal Information"
      description="Your basic contact details and online presence"
      icon={<UserIcon />}
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={draft.fullName}
            onChange={e => { change('fullName', e.target.value); }}
            onBlur={() => { blur('fullName'); }}
            error={touched.fullName ? getError(errors, 'fullName') : undefined}
            placeholder="Jane Doe"
            autoComplete="name"
          />
          <Input
            label="Professional Title"
            value={draft.title}
            onChange={e => { change('title', e.target.value); }}
            onBlur={() => { blur('title'); }}
            placeholder="Senior Software Engineer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            value={draft.email}
            onChange={e => { change('email', e.target.value); }}
            onBlur={() => { blur('email'); }}
            error={touched.email ? getError(errors, 'email') : undefined}
            placeholder="jane@example.com"
            autoComplete="email"
          />
          <Input
            label="Phone"
            type="tel"
            value={draft.phone}
            onChange={e => { change('phone', e.target.value); }}
            onBlur={() => { blur('phone'); }}
            error={touched.phone ? getError(errors, 'phone') : undefined}
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
          />
        </div>

        <Input
          label="Location"
          value={draft.location}
          onChange={e => { change('location', e.target.value); }}
          onBlur={() => { blur('location'); }}
          placeholder="San Francisco, CA"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Website / Portfolio"
            type="url"
            value={draft.website}
            onChange={e => { change('website', e.target.value); }}
            onBlur={() => { blur('website'); }}
            error={touched.website ? getError(errors, 'website') : undefined}
            placeholder="https://janedoe.dev"
          />
          <Input
            label="LinkedIn"
            type="url"
            value={draft.linkedin}
            onChange={e => { change('linkedin', e.target.value); }}
            onBlur={() => { blur('linkedin'); }}
            error={touched.linkedin ? getError(errors, 'linkedin') : undefined}
            placeholder="https://linkedin.com/in/janedoe"
          />
        </div>

        <Input
          label="GitHub"
          type="url"
          value={draft.github}
          onChange={e => { change('github', e.target.value); }}
          onBlur={() => { blur('github'); }}
          error={touched.github ? getError(errors, 'github') : undefined}
          placeholder="https://github.com/janedoe"
        />
      </div>
    </SectionWrapper>
  )
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
