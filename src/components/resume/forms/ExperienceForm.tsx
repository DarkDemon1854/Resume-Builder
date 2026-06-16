import { useCallback } from 'react'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import MonthYearPicker from '@/components/MonthYearPicker'
import SectionWrapper from '@/components/resume/SectionWrapper'
import DynamicList from '@/components/resume/DynamicList'
import TagInput from '@/components/resume/TagInput'
import { useResume } from '@/hooks/useResume'
import { useEntryValidation } from '@/hooks/useEntryValidation'
import { validateExperienceEntry } from '@/validation/resumeValidation'
import type { Experience } from '@/types/resume'

const BLANK: Omit<Experience, 'id'> = {
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  highlights: [],
}

type Props = { resumeId: string }

export default function ExperienceForm({ resumeId }: Props) {
  const { activeResume, addExperience, updateExperience, removeExperience, reorderExperience } =
    useResume(resumeId)

  const items = activeResume?.experience ?? []
  const { handleBlur, getErr } = useEntryValidation<Experience>(validateExperienceEntry)

  const handleAdd = useCallback(() => {
    addExperience(resumeId, { ...BLANK })
  }, [resumeId, addExperience])

  const handleUpdate = useCallback(
    (id: string, field: keyof Omit<Experience, 'id'>, value: unknown) => {
      updateExperience(resumeId, id, { [field]: value })
    },
    [resumeId, updateExperience]
  )

  return (
    <SectionWrapper
      title="Work Experience"
      description="List your professional experience, most recent first"
      icon={<BriefcaseIcon />}
    >
      <DynamicList
        items={items}
        onAdd={handleAdd}
        onRemove={id => { removeExperience(resumeId, id) }}
        onReorder={ids => { reorderExperience(resumeId, ids) }}
        emptyLabel="No experience entries yet"
        addLabel="Add Experience"
        renderItem={(item) => (
          <ExperienceEntry
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
  entry: Experience
  onChange: (field: keyof Omit<Experience, 'id'>, value: unknown) => void
  onBlur: (field: string) => void
  getError: (field: string) => string | undefined
}

function ExperienceEntry({ entry, onChange, onBlur, getError }: EntryProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Company"
          value={entry.company}
          onChange={e => { onChange('company', e.target.value) }}
          onBlur={() => { onBlur('company') }}
          error={getError('company')}
          placeholder="Acme Corp"
        />
        <Input
          label="Position"
          value={entry.position}
          onChange={e => { onChange('position', e.target.value) }}
          onBlur={() => { onBlur('position') }}
          error={getError('position')}
          placeholder="Software Engineer"
        />
      </div>

      <Input
        label="Location"
        value={entry.location}
        onChange={e => { onChange('location', e.target.value) }}
        onBlur={() => { onBlur('location') }}
        placeholder="San Francisco, CA (or Remote)"
      />

      <div className="grid grid-cols-1 gap-4">
        <MonthYearPicker
          label="Start Date"
          value={entry.startDate}
          onChange={val => { onChange('startDate', val) }}
          onBlur={() => { onBlur('startDate') }}
          error={getError('startDate')}
        />
        <MonthYearPicker
          label="End Date"
          value={entry.endDate}
          onChange={val => { onChange('endDate', val) }}
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
        <span className="text-sm text-neutral-300">I currently work here</span>
      </label>

      <TextArea
        label="Description"
        value={entry.description}
        onChange={e => { onChange('description', e.target.value) }}
        onBlur={() => { onBlur('description') }}
        placeholder="Describe your role, responsibilities, and impact..."
        rows={3}
      />

      <TagInput
        label="Key Highlights"
        value={entry.highlights}
        onChange={tags => { onChange('highlights', tags) }}
        placeholder="Add highlight and press Enter"
      />
    </div>
  )
}

function BriefcaseIcon() {
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
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

