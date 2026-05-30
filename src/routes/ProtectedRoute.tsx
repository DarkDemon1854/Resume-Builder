import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/constants'

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <Outlet />
}
