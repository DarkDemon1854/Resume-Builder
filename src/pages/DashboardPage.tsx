import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore, selectUser } from '@/store/authStore'
import { useResumeStore } from '@/store/resumeStore'
import { ROUTES, TEMPLATE_IDS, type TemplateId } from '@/constants'
import { toast } from '@/store/toastStore'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import { getTemplate } from '@/templates/registry-utils'
import { normalizeResume } from '@/templates/normalize'
import type { Resume } from '@/types/resume'
import { MOCK_RESUME } from '@/utils/mock-resume'



function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex-col-center py-24 text-center gap-6 animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 flex-center mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-10 h-10 text-neutral-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-neutral-300 mb-2">No resumes yet</h3>
        <p className="text-sm text-neutral-500 max-w-xs mx-auto text-balance">
          Create your first professional resume and start landing interviews.
        </p>
      </div>
      <Button
        id="empty-create-resume"
        variant="primary"
        size="md"
        onClick={onCreate}
        leftIcon={<PlusIcon />}
      >
        Create Resume
      </Button>
    </div>
  )
}

type ResumeCardProps = {
  resume: Resume
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
}

function ResumeCard({ resume, onDuplicate, onDelete }: ResumeCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(resume.updatedAt))

  const config = getTemplate(resume.templateId as TemplateId) || getTemplate('modern')
  const TemplateComponent = config.component
  const normalizedResume = normalizeResume(resume)

  return (
    <Card hover className="group flex flex-col gap-4">
      <Link to={ROUTES.EDITOR(resume.id)} className="block">
        <div className="w-full h-44 rounded-lg bg-neutral-900 overflow-hidden relative border border-neutral-700/40 group-hover:border-primary-500/20 transition-colors duration-200">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[794px] h-[1123px] origin-top scale-[0.20] pointer-events-none bg-white">
            <TemplateComponent resume={normalizedResume} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            <span className="text-xs font-medium text-white/90 capitalize drop-shadow-md">{resume.templateId}</span>
          </div>
        </div>
      </Link>
      <div className="flex-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-neutral-100 truncate">{resume.title}</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Updated {formattedDate}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Link to={ROUTES.EDITOR(resume.id)}>
            <Button id={`edit-resume-${resume.id}`} variant="secondary" size="sm">
              Edit
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => { onDuplicate(resume.id) }}
            className="p-1.5 rounded-md text-neutral-500 hover:text-primary-400 hover:bg-primary-500/10 transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Duplicate resume"
            title="Duplicate"
          >
            <CopyIcon />
          </button>
          <button
            type="button"
            onClick={() => { onDelete(resume.id) }}
            className="p-1.5 rounded-md text-neutral-500 hover:text-danger-400 hover:bg-danger-500/10 transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Delete resume"
            title="Delete"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </Card>
  )
}

export default function DashboardPage() {
  const user = useAuthStore(selectUser)
  const { resumes } = useResumeStore()
  const createResume = useResumeStore((s) => s.createResume)
  const duplicateResume = useResumeStore((s) => s.duplicateResume)
  const deleteResume = useResumeStore((s) => s.deleteResume)
  const navigate = useNavigate()

  const [showCreate, setShowCreate] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('modern')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleCreate = useCallback(() => {
    const trimmed = newTitle.trim() || 'Untitled Resume'
    const id = createResume(trimmed, selectedTemplate)
    setShowCreate(false)
    setNewTitle('')
    setSelectedTemplate('modern')
    toast.success('Resume created')
    navigate(ROUTES.EDITOR(id))
  }, [newTitle, selectedTemplate, createResume, navigate])

  const handleDuplicate = useCallback(
    (id: string) => {
      const newId = duplicateResume(id)
      if (newId) {
        toast.success('Resume duplicated')
      }
    },
    [duplicateResume]
  )

  const handleConfirmDelete = useCallback(() => {
    if (deleteId) {
      deleteResume(deleteId)
      setDeleteId(null)
      toast.info('Resume deleted')
    }
  }, [deleteId, deleteResume])

  const greeting = (() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  })()

  return (
    <div className="p-6 md:p-8 animate-fade-in">
      <div className="mb-8 flex-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-50">
            {greeting}, {user?.name.split(' ')[0] ?? 'there'} 👋
          </h1>
          <p className="text-neutral-400 text-sm mt-1">Manage and build your professional resumes.</p>
        </div>
        <Button
          id="dashboard-create-resume"
          variant="primary"
          size="md"
          onClick={() => { setShowCreate(true) }}
          leftIcon={<PlusIcon />}
        >
          New Resume
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Resumes', value: resumes.length, icon: '📄' },
          { label: 'Templates Used', value: new Set(resumes.map((r) => r.templateId)).size, icon: '🎨' },
          { label: 'Last Active', value: resumes.length > 0 ? 'Today' : '—', icon: '🕐' },
          { label: 'Profile', value: '100%', icon: '✅' },
        ].map((stat) => (
          <Card key={stat.label} padding="sm" className="flex flex-col gap-1">
            <span className="text-lg">{stat.icon}</span>
            <span className="text-xl font-bold text-neutral-50">{stat.value}</span>
            <span className="text-xs text-neutral-500">{stat.label}</span>
          </Card>
        ))}
      </div>

      <div>
        <div className="flex-between mb-5">
          <h2 className="text-base font-semibold text-neutral-200">Your Resumes</h2>
          {resumes.length > 0 && (
            <span className="text-xs text-neutral-500">
              {resumes.length} resume{resumes.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {resumes.length === 0 ? (
          <EmptyState onCreate={() => { setShowCreate(true) }} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {resumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onDuplicate={handleDuplicate}
                onDelete={(id) => { setDeleteId(id) }}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={showCreate}
        onClose={() => { setShowCreate(false) }}
        title="Create New Resume"
        size="lg"
      >
        <div className="flex flex-col gap-5">
          <Input
            label="Resume Title"
            value={newTitle}
            onChange={(e) => { setNewTitle(e.target.value) }}
            placeholder="My Professional Resume"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCreate()
              }
            }}
          />

          <div className="flex flex-col gap-2">
            <span className="label-base">Template</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {TEMPLATE_IDS.map((tpl) => {
                const TemplateComponent = getTemplate(tpl).component
                return (
                  <button
                    key={tpl}
                    type="button"
                    onClick={() => { setSelectedTemplate(tpl) }}
                    className={[
                      'flex flex-col items-center gap-2 p-2 rounded-lg border transition-all duration-200 capitalize text-xs font-medium group',
                      selectedTemplate === tpl
                        ? 'border-primary-500/80 bg-primary-500/10 text-primary-300 shadow-glow-sm ring-1 ring-primary-500/50'
                        : 'border-neutral-700 bg-neutral-800/40 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/80',
                    ].join(' ')}
                  >
                    <div className="w-full h-32 rounded bg-neutral-900 overflow-hidden relative border border-neutral-700/50 group-hover:border-neutral-500/50 transition-colors">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[794px] h-[1123px] origin-top scale-[0.15] pointer-events-none bg-white">
                        <TemplateComponent resume={normalizeResume(MOCK_RESUME)} />
                      </div>
                    </div>
                    <span className="mt-1">{tpl}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800 mt-2">
            <Button variant="ghost" size="md" onClick={() => { setShowCreate(false) }}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleCreate}>
              Create Resume
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={deleteId !== null}
        onClose={() => { setDeleteId(null) }}
        title="Delete Resume"
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-neutral-300">
            Are you sure you want to delete this resume? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={() => { setDeleteId(null) }}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}
