import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore, selectIsAuthenticated, selectIsLoading } from '@/store/authStore'
import { ROUTES } from '@/constants'
import Loader from '@/components/Loader'

export default function PublicRoute() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const isLoading = useAuthStore(selectIsLoading)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader size="lg" label="Restoring session…" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}
