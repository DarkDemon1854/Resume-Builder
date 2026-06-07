export type PersonalInfo = {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
  avatar: string
  summary: string
}

export type Experience = {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  highlights: string[]
}

export type Education = {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  gpa: string
  highlights: string[]
}

export type Skill = {
  id: string
  category: string
  items: string[]
}

export type Project = {
  id: string
  name: string
  description: string
  technologies: string[]
  url: string
  github: string
  startDate: string
  endDate: string
  current: boolean
  highlights: string[]
}

export type Certification = {
  id: string
  name: string
  issuer: string
  date: string
  url: string
  credentialId: string
}

export type LanguageProficiency =
  | 'native'
  | 'fluent'
  | 'advanced'
  | 'intermediate'
  | 'beginner'

export type Language = {
  id: string
  language: string
  proficiency: LanguageProficiency
}

export type Award = {
  id: string
  title: string
  issuer: string
  date: string
  description: string
}

export type Resume = {
  id: string
  title: string
  templateId: string
  sections: string[]
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  languages: Language[]
  awards: Award[]
  createdAt: string
  updatedAt: string
}
