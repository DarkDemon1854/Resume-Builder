import { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/constants'
import Button from '@/components/Button'

type SidebarProps = {
  open: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    to: ROUTES.DASHBOARD,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path
          fillRule="evenodd"
          d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]

const NavItemEl = ({ item, onClick }: { item: (typeof NAV_ITEMS)[0]; onClick?: () => void }) => (
  <NavLink
    to={item.to}
    end
    onClick={onClick}
    className={({ isActive }) =>
      [
        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-primary-500/15 text-primary-300 shadow-glow-sm'
          : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/70',
      ].join(' ')
    }
  >
    <span className="shrink-0">{item.icon}</span>
    <span>{item.label}</span>
  </NavLink>
)

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    if (onClose) onClose()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-neutral-800/60 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 flex-center shadow-glow-sm">
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
          </svg>
        </div>
        <span className="text-base font-bold text-gradient">ResumeCraft</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map(item => (
          <NavItemEl key={item.to} item={item} onClick={onClose} />
        ))}
      </nav>

      <div className="px-3 pb-4 pt-3 border-t border-neutral-800/60 shrink-0">
        {user && (
          <div className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-lg bg-neutral-800/40">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 flex-center shrink-0">
              <span className="text-xs font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-100 truncate">{user.name}</p>
              <p className="text-xs text-neutral-500 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <Button
          id="sidebar-logout"
          variant="ghost"
          size="sm"
          fullWidth
          onClick={handleLogout}
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-1.08a.75.75 0 10-1.004-1.114l-2.5 2.5a.75.75 0 000 1.128l2.5 2.5a.75.75 0 101.004-1.114l-1.048-1.08H18.25A.75.75 0 0019 10z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          Sign out
        </Button>
      </div>
    </div>
  )
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) { onClose() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey) }
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 glass-dark border-r border-neutral-800/60">
        <SidebarContent />
      </aside>

      {open && (
        <div
          ref={overlayRef}
          className="lg:hidden fixed inset-0 z-40 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation sidebar"
        >
          <div
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
            aria-hidden="true"
          />
          <aside className="relative z-50 w-64 h-full glass-dark border-r border-neutral-800/60 animate-slide-up">
            <SidebarContent onClose={onClose} />
          </aside>
        </div>
      )}
    </>
  )
}
