import { Link } from 'react-router-dom'
import { useAuthStore, selectUser } from '@/store/authStore'
import { useResumeStore } from '@/store/resumeStore'
import { ROUTES } from '@/constants'
import Button from '@/components/Button'
import Card from '@/components/Card'

function EmptyState() {
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
        leftIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        }
      >
        Create Resume
      </Button>
    </div>
  )
}

type ResumeCardProps = {
  id: string
  title: string
  template: string
  updatedAt: string
}

function ResumeCard({ id, title, template, updatedAt }: ResumeCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(updatedAt))

  return (
    <Card hover className="group flex flex-col gap-4">
      <div className="w-full h-36 rounded-lg bg-gradient-to-br from-primary-950/60 to-secondary-950/60 border border-neutral-700/40 flex-col-center gap-2 text-neutral-600 group-hover:border-primary-500/20 transition-colors duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-12 h-12 opacity-40"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <span className="text-xs capitalize opacity-60">{template}</span>
      </div>
      <div className="flex-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-neutral-100 truncate">{title}</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Updated {formattedDate}</p>
        </div>
        <Link to={ROUTES.EDITOR(id)}>
          <Button id={`edit-resume-${id}`} variant="secondary" size="sm">
            Edit
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export default function DashboardPage() {
  const user = useAuthStore(selectUser)
  const { resumes } = useResumeStore()

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
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          }
        >
          New Resume
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Resumes', value: resumes.length, icon: '📄' },
          { label: 'Templates Used', value: new Set(resumes.map(r => r.templateId)).size, icon: '🎨' },
          { label: 'Last Active', value: resumes.length > 0 ? 'Today' : '—', icon: '🕐' },
          { label: 'Profile', value: '100%', icon: '✅' },
        ].map(stat => (
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
            <span className="text-xs text-neutral-500">{resumes.length} resume{resumes.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {resumes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {resumes.map(resume => (
              <ResumeCard
                key={resume.id}
                id={resume.id}
                title={resume.title}
                template={resume.templateId}
                updatedAt={resume.updatedAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
