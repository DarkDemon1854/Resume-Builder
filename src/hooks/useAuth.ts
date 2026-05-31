import { useAuthStore, selectUser, selectIsAuthenticated, selectIsLoading, selectAuthError } from '@/store/authStore'

export function useAuth() {
  const user = useAuthStore(selectUser)
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const isLoading = useAuthStore(selectIsLoading)
  const error = useAuthStore(selectAuthError)
  const setUser = useAuthStore(state => state.setUser)
  const clearUser = useAuthStore(state => state.clearUser)
  const setStatus = useAuthStore(state => state.setStatus)
  const setError = useAuthStore(state => state.setError)
  const clearError = useAuthStore(state => state.clearError)

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    clearUser,
    setStatus,
    setError,
    clearError,
  }
}
