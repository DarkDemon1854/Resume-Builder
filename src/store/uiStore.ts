import { create } from 'zustand'

type UIState = {
  theme: 'light' | 'dark' | 'system'
  sidebarOpen: boolean
  activeModal: string | null
}

type UIActions = {
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleSidebar: () => void
  setSidebarOpen: (isOpen: boolean) => void
  openModal: (modalId: string) => void
  closeModal: () => void
}

type UIStore = UIState & UIActions

export const useUIStore = create<UIStore>((set) => ({
  theme: 'system',
  sidebarOpen: false,
  activeModal: null,

  setTheme: (theme) => { set({ theme }) },
  toggleSidebar: () => { set((state) => ({ sidebarOpen: !state.sidebarOpen })) },
  setSidebarOpen: (isOpen) => { set({ sidebarOpen: isOpen }) },
  openModal: (modalId) => { set({ activeModal: modalId }) },
  closeModal: () => { set({ activeModal: null }) },
}))
