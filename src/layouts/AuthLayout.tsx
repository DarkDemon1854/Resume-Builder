import { Outlet, Link } from 'react-router-dom'
import { APP_NAME, ROUTES } from '@/constants'

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased overflow-hidden flex flex-col">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[25%] -left-[15%] w-[700px] h-[700px] rounded-full bg-primary-600/8 blur-[140px]" />
        <div className="absolute -bottom-[25%] -right-[15%] w-[600px] h-[600px] rounded-full bg-secondary-600/8 blur-[120px]" />
        <div className="absolute top-[35%] right-[25%] w-[350px] h-[350px] rounded-full bg-primary-500/4 blur-[90px]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-5">
        <Link
          to={ROUTES.HOME}
          aria-label={`${APP_NAME} – back to home`}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                fillRule="evenodd"
                d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z"
                clipRule="evenodd"
              />
              <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.588z" />
            </svg>
          </div>
          <span className="text-sm font-bold bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-300 bg-clip-text text-transparent">
            {APP_NAME}
          </span>
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md animate-fade-in">
          <Outlet />
        </div>
      </main>

      <footer className="relative z-10 py-4 text-center text-xs text-neutral-700">
        © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </footer>
    </div>
  )
}
