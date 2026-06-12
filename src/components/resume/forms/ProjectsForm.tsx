import { useCallback } from 'react'
import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import SectionWrapper from '@/components/resume/SectionWrapper'
import DynamicList from '@/components/resume/DynamicList'
import TagInput from '@/components/resume/TagInput'
import { useResume } from '@/hooks/useResume'
import { useEntryValidation } from '@/hooks/useEntryValidation'
import { validateProjectEntry } from '@/validation/resumeValidation'
import type { Project } from '@/types/resume'

type Props = { resumeId: string }


const BLANK: Omit<Project, 'id'> = {
  name: '',
  description: '',
  technologies: [],
  url: '',
  github: '',
  startDate: '',
  endDate: '',
  current: false,
  highlights: [],
}

export default function ProjectsForm({ resumeId }: Props) {
  const { activeResume, addProject, updateProject, removeProject, reorderProjects } =
    useResume(resumeId)

  const items = activeResume?.projects ?? []
  const { handleBlur, getErr } = useEntryValidation<Project>(validateProjectEntry)

  const handleAdd = useCallback(() => {
    addProject(resumeId, { ...BLANK })
  }, [resumeId, addProject])

  const handleUpdate = useCallback(
    (id: string, field: keyof Omit<Project, 'id'>, value: unknown) => {
      updateProject(resumeId, id, { [field]: value })
    },
    [resumeId, updateProject]
  )

  return (
    <SectionWrapper
      title="Projects"
      description="Showcase your personal and professional projects"
      icon={<CodeIcon />}
    >
      <DynamicList
        items={items}
        onAdd={handleAdd}
        onRemove={id => { removeProject(resumeId, id) }}
        onReorder={ids => { reorderProjects(resumeId, ids) }}
        emptyLabel="No projects added yet"
        addLabel="Add Project"
        renderItem={(item) => (
          <ProjectEntry
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
  entry: Project
  onChange: (field: keyof Omit<Project, 'id'>, value: unknown) => void
  onBlur: (field: string) => void
  getError: (field: string) => string | undefined
}

function ProjectEntry({ entry, onChange, onBlur, getError }: EntryProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Project Name"
        value={entry.name}
        onChange={e => { onChange('name', e.target.value) }}
        onBlur={() => { onBlur('name') }}
        error={getError('name')}
        placeholder="Open Source CMS"
      />

      <TextArea
        label="Description"
        value={entry.description}
        onChange={e => { onChange('description', e.target.value) }}
        onBlur={() => { onBlur('description') }}
        error={getError('description')}
        placeholder="What does this project do? What problem does it solve?"
        rows={3}
      />

      <TagInput
        label="Technologies / Stack"
        value={entry.technologies}
        onChange={tags => { onChange('technologies', tags) }}
        placeholder="React, Node.js, PostgreSQL..."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Live URL (optional)"
          type="url"
          value={entry.url}
          onChange={e => { onChange('url', e.target.value) }}
          onBlur={() => { onBlur('url') }}
          error={getError('url')}
          placeholder="https://myproject.com"
        />
        <Input
          label="GitHub URL (optional)"
          type="url"
          value={entry.github}
          onChange={e => { onChange('github', e.target.value) }}
          onBlur={() => { onBlur('github') }}
          error={getError('github')}
          placeholder="https://github.com/user/repo"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="month"
          value={entry.startDate}
          onChange={e => { onChange('startDate', e.target.value) }}
          onBlur={() => { onBlur('startDate') }}
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
        <span className="text-sm text-neutral-300">Ongoing / active project</span>
      </label>

      <TagInput
        label="Key Highlights (optional)"
        value={entry.highlights}
        onChange={tags => { onChange('highlights', tags) }}
        placeholder="10k+ users, reduced latency 40%..."
      />
    </div>
  )
}

function CodeIcon() {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

