import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/constants'

type User = {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

type AuthActions = {
  setUser: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      ...initialState,

      setUser: user =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }),

      logout: () => set(initialState),

      setLoading: isLoading => set({ isLoading }),

      setError: error => set({ error, isLoading: false }),

      clearError: () => set({ error: null }),
    }),
    {
      name: STORAGE_KEYS.AUTH,
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

export type { User, AuthState }
