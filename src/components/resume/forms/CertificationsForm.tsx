import { useCallback } from 'react'
import Input from '@/components/Input'
import SectionWrapper from '@/components/resume/SectionWrapper'
import DynamicList from '@/components/resume/DynamicList'
import { useResume } from '@/hooks/useResume'
import { useEntryValidation } from '@/hooks/useEntryValidation'
import { validateCertificationEntry } from '@/validation/resumeValidation'
import type { Certification } from '@/types/resume'

const BLANK: Omit<Certification, 'id'> = {
  name: '',
  issuer: '',
  date: '',
  url: '',
  credentialId: '',
}

type Props = { resumeId: string }

export default function CertificationsForm({ resumeId }: Props) {
  const {
    activeResume,
    addCertification,
    updateCertification,
    removeCertification,
    reorderCertifications,
  } = useResume(resumeId)

  const items = activeResume?.certifications ?? []
  const { handleBlur, getErr } = useEntryValidation<Certification>(validateCertificationEntry)

  const handleAdd = useCallback(() => {
    addCertification(resumeId, { ...BLANK })
  }, [resumeId, addCertification])

  const handleUpdate = useCallback(
    (id: string, field: keyof Omit<Certification, 'id'>, value: string) => {
      updateCertification(resumeId, id, { [field]: value })
    },
    [resumeId, updateCertification]
  )

  return (
    <SectionWrapper
      title="Certifications"
      description="Professional certifications and credentials (optional)"
      icon={<BadgeIcon />}
    >
      <DynamicList
        items={items}
        onAdd={handleAdd}
        onRemove={id => { removeCertification(resumeId, id) }}
        onReorder={ids => { reorderCertifications(resumeId, ids) }}
        emptyLabel="No certifications added yet — this section is optional"
        addLabel="Add Certification"
        renderItem={(item) => (
          <CertificationEntry
            entry={item}
            onChange={(field, value) => { handleUpdate(item.id, field, value) }}
            onBlur={field => { handleBlur(item, field) }}
            getError={field => getErr(item.id, field)}
          />
        )}
      />
    </SectionWrapper>
  )
}

type EntryProps = {
  entry: Certification
  onChange: (field: keyof Omit<Certification, 'id'>, value: string) => void
  onBlur: (field: string) => void
  getError: (field: string) => string | undefined
}

function CertificationEntry({ entry, onChange, onBlur, getError }: EntryProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Certification Name"
          value={entry.name}
          onChange={e => { onChange('name', e.target.value) }}
          onBlur={() => { onBlur('name') }}
          error={getError('name')}
          placeholder="AWS Certified Solutions Architect"
        />
        <Input
          label="Issuing Organization"
          value={entry.issuer}
          onChange={e => { onChange('issuer', e.target.value) }}
          onBlur={() => { onBlur('issuer') }}
          error={getError('issuer')}
          placeholder="Amazon Web Services"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Issue Date"
          type="month"
          value={entry.date}
          onChange={e => { onChange('date', e.target.value) }}
          onBlur={() => { onBlur('date') }}
        />
        <Input
          label="Credential ID (optional)"
          value={entry.credentialId}
          onChange={e => { onChange('credentialId', e.target.value) }}
          onBlur={() => { onBlur('credentialId') }}
          placeholder="ABC-123-XYZ"
        />
      </div>

      <Input
        label="Credential URL (optional)"
        type="url"
        value={entry.url}
        onChange={e => { onChange('url', e.target.value) }}
        onBlur={() => { onBlur('url') }}
        error={getError('url')}
        placeholder="https://credentials.example.com/verify/..."
      />
    </div>
  )
}

function BadgeIcon() {
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
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

