import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/constants'
import type { AuthUser } from '@/services/authService'

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated'

type AuthState = {
  user: AuthUser | null
  status: AuthStatus
  error: string | null
  sessionChecked: boolean
}

type AuthActions = {
  setUser: (user: AuthUser) => void
  clearUser: () => void
  setStatus: (status: AuthStatus) => void
  setError: (error: string | null) => void
  clearError: () => void
  setSessionChecked: (checked: boolean) => void
}

type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
  sessionChecked: false,
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      ...initialState,

      setUser: user =>
        set({
          user,
          status: 'authenticated',
          error: null,
          sessionChecked: true,
        }),

      clearUser: () =>
        set({
          user: null,
          status: 'unauthenticated',
          error: null,
          sessionChecked: true,
        }),

      setStatus: status => set({ status }),

      setError: error => set({ error, status: 'unauthenticated' }),

      clearError: () => set({ error: null }),

      setSessionChecked: sessionChecked => set({ sessionChecked }),
    }),
    {
      name: STORAGE_KEYS.AUTH,
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        status: state.status,
      }),
    }
  )
)

export const selectIsAuthenticated = (state: AuthStore) => state.status === 'authenticated'
export const selectIsLoading = (state: AuthStore) => state.status === 'loading' || !state.sessionChecked
export const selectUser = (state: AuthStore) => state.user
export const selectAuthError = (state: AuthStore) => state.error
export const selectSessionChecked = (state: AuthStore) => state.sessionChecked

export type { AuthUser, AuthStatus }

