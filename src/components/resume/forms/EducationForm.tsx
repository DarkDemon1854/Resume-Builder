import { useCallback } from 'react'
import Input from '@/components/Input'
import SectionWrapper from '@/components/resume/SectionWrapper'
import DynamicList from '@/components/resume/DynamicList'
import TagInput from '@/components/resume/TagInput'
import { useResume } from '@/hooks/useResume'
import { useEntryValidation } from '@/hooks/useEntryValidation'
import { validateEducationEntry } from '@/validation/resumeValidation'
import type { Education } from '@/types/resume'

const BLANK: Omit<Education, 'id'> = {
  institution: '',
  degree: '',
  field: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  gpa: '',
  highlights: [],
}

type Props = { resumeId: string }

export default function EducationForm({ resumeId }: Props) {
  const { activeResume, addEducation, updateEducation, removeEducation, reorderEducation } =
    useResume(resumeId)

  const items = activeResume?.education ?? []
  const { handleBlur, getErr } = useEntryValidation<Education>(validateEducationEntry)

  const handleAdd = useCallback(() => {
    addEducation(resumeId, { ...BLANK })
  }, [resumeId, addEducation])

  const handleUpdate = useCallback(
    (id: string, field: keyof Omit<Education, 'id'>, value: unknown) => {
      updateEducation(resumeId, id, { [field]: value })
    },
    [resumeId, updateEducation]
  )

  return (
    <SectionWrapper
      title="Education"
      description="Academic background and qualifications"
      icon={<GraduationIcon />}
    >
      <DynamicList
        items={items}
        onAdd={handleAdd}
        onRemove={id => { removeEducation(resumeId, id) }}
        onReorder={ids => { reorderEducation(resumeId, ids) }}
        emptyLabel="No education entries yet"
        addLabel="Add Education"
        renderItem={(item) => (
          <EducationEntry
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
  entry: Education
  onChange: (field: keyof Omit<Education, 'id'>, value: unknown) => void
  onBlur: (field: string) => void
  getError: (field: string) => string | undefined
}

function EducationEntry({ entry, onChange, onBlur, getError }: EntryProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Institution"
        value={entry.institution}
        onChange={e => { onChange('institution', e.target.value) }}
        onBlur={() => { onBlur('institution') }}
        error={getError('institution')}
        placeholder="Massachusetts Institute of Technology"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Degree"
          value={entry.degree}
          onChange={e => { onChange('degree', e.target.value) }}
          onBlur={() => { onBlur('degree') }}
          error={getError('degree')}
          placeholder="Bachelor of Science"
        />
        <Input
          label="Field of Study"
          value={entry.field}
          onChange={e => { onChange('field', e.target.value) }}
          onBlur={() => { onBlur('field') }}
          error={getError('field')}
          placeholder="Computer Science"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Location"
          value={entry.location}
          onChange={e => { onChange('location', e.target.value) }}
          placeholder="Cambridge, MA"
        />
        <Input
          label="GPA (optional)"
          value={entry.gpa}
          onChange={e => { onChange('gpa', e.target.value) }}
          onBlur={() => { onBlur('gpa') }}
          error={getError('gpa')}
          placeholder="3.9"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="month"
          value={entry.startDate}
          onChange={e => { onChange('startDate', e.target.value) }}
          onBlur={() => { onBlur('startDate') }}
          error={getError('startDate')}
        />
        <Input
          label="End Date"
          type="month"
          value={entry.endDate}
          onChange={e => { onChange('endDate', e.target.value) }}
          onBlur={() => { onBlur('endDate') }}
          error={getError('endDate')}
          disabled={entry.current}
        />
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer select-none w-fit">
        <input
          type="checkbox"
          checked={entry.current}
          onChange={e => {
            onChange('current', e.target.checked)
            if (e.target.checked) onChange('endDate', '')
          }}
          className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-primary-500 focus:ring-primary-500/40"
        />
        <span className="text-sm text-neutral-300">Currently enrolled</span>
      </label>

      <TagInput
        label="Achievements & Activities (optional)"
        value={entry.highlights}
        onChange={tags => { onChange('highlights', tags) }}
        placeholder="Dean's List, Club President..."
      />
    </div>
  )
}

function GraduationIcon() {
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
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

