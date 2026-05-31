import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased flex">
      <Sidebar open={sidebarOpen} onClose={() => { setSidebarOpen(false) }} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex-between h-14 px-4 border-b border-neutral-800/60 glass-dark sticky top-0 z-30">
          <button
            id="sidebar-open-btn"
            className="btn-base ghost h-9 w-9 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60"
            onClick={() => { setSidebarOpen(true) }}
            aria-label="Open navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gradient">ResumeCraft</span>
          <div className="w-9" />
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
