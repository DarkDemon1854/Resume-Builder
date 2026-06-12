import { useCallback } from 'react'
import Input from '@/components/Input'
import SectionWrapper from '@/components/resume/SectionWrapper'
import DynamicList from '@/components/resume/DynamicList'
import TagInput from '@/components/resume/TagInput'
import { useResume } from '@/hooks/useResume'
import { useEntryValidation } from '@/hooks/useEntryValidation'
import { validateSkillEntry } from '@/validation/resumeValidation'
import type { Skill } from '@/types/resume'

type Props = { resumeId: string }

import { createBlankSkill } from '@/utils/resumeDefaults'

export default function SkillsForm({ resumeId }: Props) {
  const { activeResume, addSkill, updateSkill, removeSkill, reorderSkills } = useResume(resumeId)

  const skillGroups = activeResume?.skills ?? []
  const { handleBlur, getErr } = useEntryValidation<Skill>(validateSkillEntry)

  const handleAdd = useCallback(() => {
    addSkill(resumeId, createBlankSkill())
  }, [resumeId, addSkill])

  const handleUpdate = useCallback(
    (id: string, field: keyof Omit<Skill, 'id'>, value: unknown) => {
      updateSkill(resumeId, id, { [field]: value })
    },
    [resumeId, updateSkill]
  )

  return (
    <SectionWrapper
      title="Skills"
      description="Group your skills by category (e.g. Languages, Frameworks, Tools)"
      icon={<SparkleIcon />}
    >
      <DynamicList
        items={skillGroups}
        onAdd={handleAdd}
        onRemove={id => { removeSkill(resumeId, id) }}
        onReorder={ids => { reorderSkills(resumeId, ids) }}
        emptyLabel="No skill categories added yet"
        addLabel="Add Skill Category"
        renderItem={(item) => (
          <SkillEntry
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
  entry: Skill
  onChange: (field: keyof Omit<Skill, 'id'>, value: unknown) => void
  onBlur: (field: string) => void
  getError: (field: string) => string | undefined
}

function SkillEntry({ entry, onChange, onBlur, getError }: EntryProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Category"
        value={entry.category}
        onChange={e => { onChange('category', e.target.value) }}
        onBlur={() => { onBlur('category') }}
        error={getError('category')}
        placeholder="Programming Languages"
      />
      <TagInput
        label="Skills"
        value={entry.items}
        onChange={tags => {
          onChange('items', tags)
          onBlur('items')
        }}
        error={getError('items')}
        placeholder="TypeScript, Python, Rust..."
      />
    </div>
  )
}

function SparkleIcon() {
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
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M5 20l.7-2 2-.7-2-.7L5 14l-.7 2.6-2 .7 2 .7z" />
      <path d="M19 2l.7 2 2 .7-2 .7L19 7.4l-.7-2-2-.7 2-.7z" />
    </svg>
  )
}

