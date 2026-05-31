import { useEffect } from 'react'
import { authService } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'

export function useAuthSession(): void {
  const setUser = useAuthStore(state => state.setUser)
  const clearUser = useAuthStore(state => state.clearUser)
  const setSessionChecked = useAuthStore(state => state.setSessionChecked)

  useEffect(() => {
    const unsubscribe = authService.onSessionChange(user => {
      if (user) {
        setUser(user)
      } else {
        clearUser()
      }
      setSessionChecked(true)
    })

    return unsubscribe
  }, [setUser, clearUser, setSessionChecked])
}
