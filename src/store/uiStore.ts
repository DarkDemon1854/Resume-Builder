import { create } from 'zustand'
import type { ResumeSectionKey } from '@/constants'

type UIState = {
  theme: 'light' | 'dark' | 'system'
  sidebarOpen: boolean
  activeModal: string | null
  builderActiveSection: ResumeSectionKey
}

type UIActions = {
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleSidebar: () => void
  setSidebarOpen: (isOpen: boolean) => void
  openModal: (modalId: string) => void
  closeModal: () => void
  setBuilderActiveSection: (section: ResumeSectionKey) => void
}

type UIStore = UIState & UIActions

export const useUIStore = create<UIStore>((set) => ({
  theme: 'system',
  sidebarOpen: false,
  activeModal: null,
  builderActiveSection: 'personalInfo',

  setTheme: (theme) => { set({ theme }) },
  toggleSidebar: () => { set((state) => ({ sidebarOpen: !state.sidebarOpen })) },
  setSidebarOpen: (isOpen) => { set({ sidebarOpen: isOpen }) },
  openModal: (modalId) => { set({ activeModal: modalId }) },
  closeModal: () => { set({ activeModal: null }) },
  setBuilderActiveSection: (section) => { set({ builderActiveSection: section }) },
}))
