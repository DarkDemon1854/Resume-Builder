import type { ComponentType } from 'react'
import type { TemplateId } from '@/constants'

export type NormalizedPersonalInfo = {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
  summary: string
  avatar: string
  wechat: string
  age: string
  gender: string
  hometown: string
  maritalStatus: string
  yearsOfExperience: string
  educationLevel: string
}

export type NormalizedExperience = {
  id: string
  company: string
  position: string
  location: string
  period: string
  description: string
  highlights: string[]
}

export type NormalizedEducation = {
  id: string
  institution: string
  degree: string
  location: string
  period: string
  gpa: string
  highlights: string[]
}

export type NormalizedSkill = {
  id: string
  category: string
  items: string[]
}

export type NormalizedProject = {
  id: string
  name: string
  description: string
  technologies: string[]
  url: string
  github: string
  period: string
  highlights: string[]
}

export type NormalizedCertification = {
  id: string
  name: string
  issuer: string
  date: string
  url: string
}

export type NormalizedLanguage = {
  id: string
  language: string
  proficiency: string
}

export type NormalizedAward = {
  id: string
  title: string
  issuer: string
  date: string
  description: string
}

export type NormalizedResume = {
  personalInfo: NormalizedPersonalInfo
  experience: NormalizedExperience[]
  education: NormalizedEducation[]
  skills: NormalizedSkill[]
  projects: NormalizedProject[]
  certifications: NormalizedCertification[]
  languages: NormalizedLanguage[]
  awards: NormalizedAward[]
  visibleSections: string[]
}

export type TemplateProps = {
  resume: NormalizedResume
}

export type TemplateMeta = {
  id: TemplateId
  name: string
  description: string
  tags: string[]
  previewColor: string
}

export type TemplateConfig = {
  meta: TemplateMeta
  component: ComponentType<TemplateProps>
}
