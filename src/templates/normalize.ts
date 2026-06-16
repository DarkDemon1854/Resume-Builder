import { formatDate } from '@/utils'
import type {
  Resume,
  Experience,
  Education,
  Project,
} from '@/types/resume'
import type {
  NormalizedResume,
  NormalizedPersonalInfo,
  NormalizedExperience,
  NormalizedEducation,
  NormalizedSkill,
  NormalizedProject,
  NormalizedCertification,
  NormalizedLanguage,
  NormalizedAward,
} from './types'

function trim(val: string | undefined | null): string {
  return val?.trim() ?? ''
}

function buildPeriod(
  startDate: string,
  endDate: string,
  current: boolean
): string {
  const start = trim(startDate)
  const end = trim(endDate)
  if (!start && !end) return ''
  const startFmt = start ? formatDate(start) : ''
  const endFmt = current ? 'Present' : end ? formatDate(end) : ''
  if (!startFmt && !endFmt) return ''
  if (!endFmt) return startFmt
  if (!startFmt) return endFmt
  return `${startFmt} – ${endFmt}`
}

function normalizePersonalInfo(pi: Resume['personalInfo']): NormalizedPersonalInfo {
  const email = trim(pi.email)
  const phone = trim(pi.phone)
  const location = trim(pi.location)
  const website = trim(pi.website)
  const linkedin = trim(pi.linkedin)
  const github = trim(pi.github)

  return {
    fullName: trim(pi.fullName) || 'Your Name',
    title: trim(pi.title),
    email,
    phone,
    location,
    website,
    linkedin,
    github,
    summary: trim(pi.summary),
    avatar: trim(pi.avatar),
    wechat: trim(pi.wechat),
    age: trim(pi.age),
    gender: trim(pi.gender),
    hometown: trim(pi.hometown),
    maritalStatus: trim(pi.maritalStatus),
    yearsOfExperience: trim(pi.yearsOfExperience),
    educationLevel: trim(pi.educationLevel),
  }
}

function normalizeExperience(items: Experience[]): NormalizedExperience[] {
  return items
    .filter(e => trim(e.company) || trim(e.position))
    .map(e => ({
      id: e.id,
      company: trim(e.company),
      position: trim(e.position),
      location: trim(e.location),
      period: buildPeriod(e.startDate, e.endDate, e.current),
      description: trim(e.description),
      highlights: e.highlights.map(trim).filter(Boolean),
    }))
}

function normalizeEducation(items: Education[]): NormalizedEducation[] {
  return items
    .filter(e => trim(e.institution) || trim(e.degree))
    .map(e => {
      const degree = [trim(e.degree), trim(e.field)].filter(Boolean).join(' in ')
      return {
        id: e.id,
        institution: trim(e.institution),
        degree,
        location: trim(e.location),
        period: buildPeriod(e.startDate, e.endDate, e.current),
        gpa: trim(e.gpa),
        highlights: e.highlights.map(trim).filter(Boolean),
      }
    })
}

function normalizeSkills(items: Resume['skills']): NormalizedSkill[] {
  return items
    .filter(s => trim(s.category) && s.items.some(i => trim(i)))
    .map(s => ({
      id: s.id,
      category: trim(s.category),
      items: s.items.map(trim).filter(Boolean),
    }))
}

function normalizeProjects(items: Project[]): NormalizedProject[] {
  return items
    .filter(p => trim(p.name))
    .map(p => ({
      id: p.id,
      name: trim(p.name),
      description: trim(p.description),
      technologies: p.technologies.map(trim).filter(Boolean),
      url: trim(p.url),
      github: trim(p.github),
      period: buildPeriod(p.startDate, p.endDate, p.current),
      highlights: p.highlights.map(trim).filter(Boolean),
    }))
}

function normalizeCertifications(items: Resume['certifications']): NormalizedCertification[] {
  return items
    .filter(c => trim(c.name))
    .map(c => ({
      id: c.id,
      name: trim(c.name),
      issuer: trim(c.issuer),
      date: c.date ? formatDate(c.date) : '',
      url: trim(c.url),
    }))
}

function normalizeLanguages(items: Resume['languages']): NormalizedLanguage[] {
  return items
    .filter(l => trim(l.language))
    .map(l => ({
      id: l.id,
      language: trim(l.language),
      proficiency: l.proficiency,
    }))
}

function normalizeAwards(items: Resume['awards']): NormalizedAward[] {
  return items
    .filter(a => trim(a.title))
    .map(a => ({
      id: a.id,
      title: trim(a.title),
      issuer: trim(a.issuer),
      date: a.date ? formatDate(a.date) : '',
      description: trim(a.description),
    }))
}

const SECTION_VISIBILITY_MAP: Record<string, (r: NormalizedResume) => boolean> = {
  summary: r => Boolean(r.personalInfo.summary),
  experience: r => r.experience.length > 0,
  education: r => r.education.length > 0,
  skills: r => r.skills.length > 0,
  projects: r => r.projects.length > 0,
  certifications: r => r.certifications.length > 0,
  languages: r => r.languages.length > 0,
  awards: r => r.awards.length > 0,
}

export function normalizeResume(resume: Resume): NormalizedResume {
  const normalized: NormalizedResume = {
    personalInfo: normalizePersonalInfo(resume.personalInfo),
    experience: normalizeExperience(resume.experience),
    education: normalizeEducation(resume.education),
    skills: normalizeSkills(resume.skills),
    projects: normalizeProjects(resume.projects),
    certifications: normalizeCertifications(resume.certifications),
    languages: normalizeLanguages(resume.languages),
    awards: normalizeAwards(resume.awards),
    visibleSections: [],
  }

  normalized.visibleSections = resume.sections.filter(key => {
    const check = (SECTION_VISIBILITY_MAP as Record<string, ((r: NormalizedResume) => boolean) | undefined>)[key]
    return check?.(normalized) === true
  })

  return normalized
}
