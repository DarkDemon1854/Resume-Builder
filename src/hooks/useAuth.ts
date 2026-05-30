import { useAuthStore } from '@/store/authStore'

export function useAuth() {
  const user = useAuthStore(state => state.user)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const isLoading = useAuthStore(state => state.isLoading)
  const error = useAuthStore(state => state.error)
  const setUser = useAuthStore(state => state.setUser)
  const logout = useAuthStore(state => state.logout)
  const setLoading = useAuthStore(state => state.setLoading)
  const setError = useAuthStore(state => state.setError)
  const clearError = useAuthStore(state => state.clearError)

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    logout,
    setLoading,
    setError,
    clearError,
  }
}
