import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/constants'

export default function AuthLayout() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased flex-center">
      <div className="w-full max-w-md px-4">
        <Outlet />
      </div>
    </div>
  )
}
