import type {
  Resume,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Project,
  Certification,
  Language,
} from '@/types/resume'

export type FieldError = {
  field: string
  message: string
}

export type SectionValidationResult = {
  valid: boolean
  errors: FieldError[]
}

export type ResumeValidationResult = {
  valid: boolean
  sections: Record<string, SectionValidationResult>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/

function isValidUrl(value: string): boolean {
  if (!value) return true
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

function err(field: string, message: string): FieldError {
  return { field, message }
}

function result(errors: FieldError[]): SectionValidationResult {
  return { valid: errors.length === 0, errors }
}

export function validatePersonalInfo(info: PersonalInfo): SectionValidationResult {
  const errors: FieldError[] = []

  if (!info.fullName.trim()) {
    errors.push(err('fullName', 'Full name is required'))
  } else if (info.fullName.trim().length < 2) {
    errors.push(err('fullName', 'Full name must be at least 2 characters'))
  }

  if (!info.email.trim()) {
    errors.push(err('email', 'Email is required'))
  } else if (!EMAIL_RE.test(info.email.trim())) {
    errors.push(err('email', 'Enter a valid email address'))
  }

  if (info.phone && !PHONE_RE.test(info.phone.trim())) {
    errors.push(err('phone', 'Enter a valid phone number'))
  }

  if (info.website && !isValidUrl(info.website)) {
    errors.push(err('website', 'Enter a valid URL'))
  }

  if (info.linkedin && !isValidUrl(info.linkedin)) {
    errors.push(err('linkedin', 'Enter a valid LinkedIn URL'))
  }

  if (info.github && !isValidUrl(info.github)) {
    errors.push(err('github', 'Enter a valid GitHub URL'))
  }

  return result(errors)
}

export function validateExperienceEntry(exp: Experience): SectionValidationResult {
  const errors: FieldError[] = []

  if (!exp.company.trim()) errors.push(err('company', 'Company is required'))
  if (!exp.position.trim()) errors.push(err('position', 'Position is required'))

  if (!exp.startDate) {
    errors.push(err('startDate', 'Start date is required'))
  }

  if (!exp.current && !exp.endDate) {
    errors.push(err('endDate', 'End date is required or mark as current'))
  }

  if (exp.startDate && exp.endDate && !exp.current) {
    if (new Date(exp.endDate) < new Date(exp.startDate)) {
      errors.push(err('endDate', 'End date must be after start date'))
    }
  }

  return result(errors)
}

export function validateEducationEntry(edu: Education): SectionValidationResult {
  const errors: FieldError[] = []

  if (!edu.institution.trim()) errors.push(err('institution', 'Institution is required'))
  if (!edu.degree.trim()) errors.push(err('degree', 'Degree is required'))
  if (!edu.field.trim()) errors.push(err('field', 'Field of study is required'))

  if (!edu.startDate) {
    errors.push(err('startDate', 'Start date is required'))
  }

  if (!edu.current && !edu.endDate) {
    errors.push(err('endDate', 'End date is required or mark as current'))
  }

  if (edu.startDate && edu.endDate && !edu.current) {
    if (new Date(edu.endDate) < new Date(edu.startDate)) {
      errors.push(err('endDate', 'End date must be after start date'))
    }
  }

  if (edu.gpa.trim()) {
    const gpa = parseFloat(edu.gpa)
    if (Number.isNaN(gpa) || gpa < 0 || gpa > 10) {
      errors.push(err('gpa', 'GPA must be a number between 0 and 10'))
    }
  }

  return result(errors)
}

export function validateSkillEntry(skill: Skill): SectionValidationResult {
  const errors: FieldError[] = []

  if (!skill.category.trim()) errors.push(err('category', 'Category name is required'))

  if (skill.items.length === 0) {
    errors.push(err('items', 'At least one skill item is required'))
  } else if (skill.items.some(item => !item.trim())) {
    errors.push(err('items', 'Skill items must not be empty'))
  }

  return result(errors)
}

export function validateProjectEntry(project: Project): SectionValidationResult {
  const errors: FieldError[] = []

  if (!project.name.trim()) errors.push(err('name', 'Project name is required'))
  if (!project.description.trim()) errors.push(err('description', 'Description is required'))

  if (project.url && !isValidUrl(project.url)) {
    errors.push(err('url', 'Enter a valid project URL'))
  }

  if (project.github && !isValidUrl(project.github)) {
    errors.push(err('github', 'Enter a valid GitHub URL'))
  }

  if (!project.current && project.startDate && project.endDate) {
    if (new Date(project.endDate) < new Date(project.startDate)) {
      errors.push(err('endDate', 'End date must be after start date'))
    }
  }

  return result(errors)
}

export function validateCertificationEntry(cert: Certification): SectionValidationResult {
  const errors: FieldError[] = []

  if (!cert.name.trim()) errors.push(err('name', 'Certification name is required'))
  if (!cert.issuer.trim()) errors.push(err('issuer', 'Issuer is required'))

  if (cert.url && !isValidUrl(cert.url)) {
    errors.push(err('url', 'Enter a valid credential URL'))
  }

  return result(errors)
}

export function validateLanguageEntry(lang: Language): SectionValidationResult {
  const errors: FieldError[] = []

  if (!lang.language.trim()) errors.push(err('language', 'Language name is required'))

  const validProficiencies = ['native', 'fluent', 'advanced', 'intermediate', 'beginner']
  if (!validProficiencies.includes(lang.proficiency)) {
    errors.push(err('proficiency', 'Select a valid proficiency level'))
  }

  return result(errors)
}

export function validateExperienceSection(entries: Experience[]): SectionValidationResult {
  if (entries.length === 0) return result([])
  const errors = entries.flatMap((exp, i) =>
    validateExperienceEntry(exp).errors.map(e => ({
      ...e,
      field: `experience[${String(i)}].${e.field}`,
    }))
  )
  return result(errors)
}

export function validateEducationSection(entries: Education[]): SectionValidationResult {
  if (entries.length === 0) return result([])
  const errors = entries.flatMap((edu, i) =>
    validateEducationEntry(edu).errors.map(e => ({
      ...e,
      field: `education[${String(i)}].${e.field}`,
    }))
  )
  return result(errors)
}

export function validateSkillsSection(entries: Skill[]): SectionValidationResult {
  if (entries.length === 0) return result([])
  const errors = entries.flatMap((skill, i) =>
    validateSkillEntry(skill).errors.map(e => ({
      ...e,
      field: `skills[${String(i)}].${e.field}`,
    }))
  )
  return result(errors)
}

export function validateProjectsSection(entries: Project[]): SectionValidationResult {
  if (entries.length === 0) return result([])
  const errors = entries.flatMap((project, i) =>
    validateProjectEntry(project).errors.map(e => ({
      ...e,
      field: `projects[${String(i)}].${e.field}`,
    }))
  )
  return result(errors)
}

export function validateCertificationsSection(entries: Certification[]): SectionValidationResult {
  if (entries.length === 0) return result([])
  const errors = entries.flatMap((cert, i) =>
    validateCertificationEntry(cert).errors.map(e => ({
      ...e,
      field: `certifications[${String(i)}].${e.field}`,
    }))
  )
  return result(errors)
}

export function validateLanguagesSection(entries: Language[]): SectionValidationResult {
  if (entries.length === 0) return result([])
  const errors = entries.flatMap((lang, i) =>
    validateLanguageEntry(lang).errors.map(e => ({
      ...e,
      field: `languages[${String(i)}].${e.field}`,
    }))
  )
  return result(errors)
}

export function validateResume(resume: Resume): ResumeValidationResult {
  const sections: Record<string, SectionValidationResult> = {
    personalInfo: validatePersonalInfo(resume.personalInfo),
    experience: validateExperienceSection(resume.experience),
    education: validateEducationSection(resume.education),
    skills: validateSkillsSection(resume.skills),
    projects: validateProjectsSection(resume.projects),
    certifications: validateCertificationsSection(resume.certifications),
    languages: validateLanguagesSection(resume.languages),
  }

  const valid = Object.values(sections).every(s => s.valid)
  return { valid, sections }
}

export function isResumeReadyForExport(resume: Resume): boolean {
  const { personalInfo, experience, education } = resume
  return (
    Boolean(personalInfo.fullName.trim()) &&
    EMAIL_RE.test(personalInfo.email.trim()) &&
    (experience.length > 0 || education.length > 0)
  )
}
