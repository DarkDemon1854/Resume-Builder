export const APP_NAME = import.meta.env.VITE_APP_NAME
export const APP_VERSION = import.meta.env.VITE_APP_VERSION
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  EDITOR: (id: string) => `/editor/${id}`,
  PREVIEW: (id: string) => `/preview/${id}`,
} as const

export const STORAGE_KEYS = {
  AUTH: 'rc_auth',
  RESUME: 'rc_resume',
  THEME: 'rc_theme',
} as const

export const TEMPLATE_IDS = [
  'default',
  'modern',
  'minimal',
  'classic',
  'executive',
  'creative',
] as const

export type TemplateId = (typeof TEMPLATE_IDS)[number]

export const RESUME_SECTIONS = [
  'personalInfo',
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'languages',
  'awards',
] as const

export type ResumeSectionKey = (typeof RESUME_SECTIONS)[number]

export const MAX_RESUMES = 20
export const AUTOSAVE_DELAY_MS = 800
export const API_TIMEOUT_MS = 15_000
