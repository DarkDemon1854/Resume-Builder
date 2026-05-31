import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/constants'
import Button from '@/components/Button'

const NAV_LINKS = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Dashboard', to: ROUTES.DASHBOARD },
]

const Logo = () => (
  <Link to={ROUTES.HOME} className="flex items-center gap-2.5 group">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 flex-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 text-white"
      >
        <path
          fillRule="evenodd"
          d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75-6.75a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
          clipRule="evenodd"
        />
        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
      </svg>
    </div>
    <span className="text-lg font-bold text-gradient">ResumeCraft</span>
  </Link>
)

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 16) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll) }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMobileOpen(false) }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass-dark border-b border-neutral-800/60 shadow-card'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <div className="container-app h-16 flex-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === ROUTES.HOME}
              className={({ isActive }) =>
                [
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'bg-primary-500/15 text-primary-300'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-neutral-400">{user?.name}</span>
              <Button variant="secondary" size="sm" onClick={logout}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to={ROUTES.SIGNUP}>
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          id="mobile-menu-toggle"
          className="md:hidden btn-base ghost h-9 w-9 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => { setMobileOpen(prev => !prev) }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden glass-dark border-t border-neutral-800/60 animate-slide-down"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="container-app py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === ROUTES.HOME}
                className={({ isActive }) =>
                  [
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-primary-500/15 text-primary-300'
                      : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="container-app pb-6 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <p className="px-4 py-2 text-sm text-neutral-400">{user?.name}</p>
                <Button variant="secondary" fullWidth onClick={logout}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} className="w-full">
                  <Button variant="secondary" fullWidth>
                    Sign in
                  </Button>
                </Link>
                <Link to={ROUTES.SIGNUP} className="w-full">
                  <Button variant="primary" fullWidth>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
