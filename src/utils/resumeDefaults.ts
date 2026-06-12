import type { Education, Skill, Project, Experience, Certification } from '@/types/resume'

export const createBlankEducation = (): Omit<Education, 'id'> => ({
  institution: '',
  degree: '',
  field: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  gpa: '',
  highlights: [],
})

export const createBlankSkill = (): Omit<Skill, 'id'> => ({
  category: '',
  items: [],
})

export const createBlankProject = (): Omit<Project, 'id'> => ({
  name: '',
  description: '',
  technologies: [],
  url: '',
  github: '',
  startDate: '',
  endDate: '',
  current: false,
  highlights: [],
})

export const createBlankExperience = (): Omit<Experience, 'id'> => ({
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  highlights: [],
})

export const createBlankCertification = (): Omit<Certification, 'id'> => ({
  name: '',
  issuer: '',
  date: '',
  url: '',
  credentialId: '',
})
