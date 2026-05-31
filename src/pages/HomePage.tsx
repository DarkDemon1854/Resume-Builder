import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants'
import Button from '@/components/Button'
import Card from '@/components/Card'

const FEATURES = [
  {
    id: 'feat-templates',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Professional Templates',
    description: 'Choose from 6+ handcrafted templates designed to impress modern recruiters and ATS systems.',
  },
  {
    id: 'feat-editor',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
      </svg>
    ),
    title: 'Live Editor',
    description: 'Edit your resume in real-time with an intuitive drag-and-drop interface and instant preview.',
  },
  {
    id: 'feat-export',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
      </svg>
    ),
    title: 'One-Click Export',
    description: 'Download pixel-perfect PDF resumes instantly, optimized for both digital and print formats.',
  },
  {
    id: 'feat-ai',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
        <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z" clipRule="evenodd" />
      </svg>
    ),
    title: 'AI Suggestions',
    description: 'Get intelligent content suggestions powered by AI to highlight your skills and achievements.',
  },
  {
    id: 'feat-autosave',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Auto-Save',
    description: 'Never lose your work again. Every change is automatically saved and synced in real-time.',
  },
  {
    id: 'feat-ats',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
      </svg>
    ),
    title: 'ATS Optimized',
    description: 'All templates are tested against major ATS parsers to maximize your interview callback rate.',
  },
]

const STATS = [
  { label: 'Resumes Built', value: '250K+' },
  { label: 'Templates Available', value: '6+' },
  { label: 'Interview Rate', value: '3x' },
  { label: 'Happy Users', value: '50K+' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section
        id="hero"
        className="relative min-h-screen flex-col-center text-center px-4 pt-24 pb-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-600/8 blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary-600/6 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary-500/5 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
            Now with AI-powered suggestions
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 text-balance">
            Build Resumes That{' '}
            <span className="text-gradient">Get You Hired</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
            Create stunning, ATS-optimized resumes in minutes. Choose from professional templates,
            customize effortlessly, and land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ROUTES.SIGNUP}>
              <Button
                id="hero-cta-primary"
                variant="primary"
                size="lg"
                rightIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                }
              >
                Start Building Free
              </Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button id="hero-cta-secondary" variant="secondary" size="lg">
                Sign in
              </Button>
            </Link>
          </div>

          <p className="text-xs text-neutral-600 mt-4">
            Free forever · No credit card required
          </p>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
          {STATS.map(stat => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 py-4 px-2 rounded-xl border border-neutral-800/60 bg-neutral-900/40"
            >
              <span className="text-3xl font-extrabold text-gradient">{stat.value}</span>
              <span className="text-xs text-neutral-500 text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="page-section">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-50 mb-4">
              Everything you need to{' '}
              <span className="text-gradient">stand out</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto text-balance">
              Powerful tools and beautiful designs to help you create the perfect resume and land your next role.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(feature => (
              <Card key={feature.id} hover className="group">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex-center text-primary-400 mb-5 group-hover:bg-primary-500/20 group-hover:border-primary-500/40 transition-colors duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-neutral-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="page-section">
        <div className="container-app">
          <div className="relative overflow-hidden rounded-2xl border border-primary-500/20 bg-gradient-to-br from-primary-950/60 via-neutral-900/80 to-secondary-950/60 p-12 md:p-16 text-center">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary-500/10 blur-[80px] rounded-full" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-50 mb-4 text-balance">
                Ready to land your{' '}
                <span className="text-gradient">dream job?</span>
              </h2>
              <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-8 text-balance">
                Join 50,000+ professionals who have already transformed their careers with ResumeCraft.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to={ROUTES.SIGNUP}>
                  <Button
                    id="cta-signup"
                    variant="primary"
                    size="lg"
                    rightIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    }
                  >
                    Get Started Free
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-neutral-600 mt-4">No credit card · Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="divider py-8">
        <div className="container-app flex-between flex-wrap gap-4">
          <span className="text-sm font-bold text-gradient">ResumeCraft</span>
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} ResumeCraft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
