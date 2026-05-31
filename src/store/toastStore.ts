import { create } from 'zustand'
import { generateId } from '@/utils'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type Toast = {
  id: string
  type: ToastType
  message: string
  duration: number
}

type ToastState = {
  toasts: Toast[]
}

type ToastActions = {
  push: (message: string, type?: ToastType, duration?: number) => string
  dismiss: (id: string) => void
  clear: () => void
}

type ToastStore = ToastState & ToastActions

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  push: (message, type = 'info', duration = 4000) => {
    const id = generateId()
    set((state) => ({ toasts: [...state.toasts, { id, type, message, duration }] }))
    return id
  },

  dismiss: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
  },

  clear: () => { set({ toasts: [] }) },
}))

export const toast = {
  success: (message: string, duration?: number) =>
    useToastStore.getState().push(message, 'success', duration),
  error: (message: string, duration?: number) =>
    useToastStore.getState().push(message, 'error', duration),
  warning: (message: string, duration?: number) =>
    useToastStore.getState().push(message, 'warning', duration),
  info: (message: string, duration?: number) =>
    useToastStore.getState().push(message, 'info', duration),
}
