import { useMemo } from 'react'
import { useResumeStore, selectResumeById } from '@/store/resumeStore'
import {
  validatePersonalInfo,
  validateExperienceEntry,
  validateEducationEntry,
  validateSkillEntry,
  validateProjectEntry,
  validateCertificationEntry,
  validateLanguageEntry,
} from '@/validation/resumeValidation'
import type { ResumeSectionKey } from '@/constants'

type SectionStatus = {
  valid: boolean
  errorCount: number
}

type SectionValidationMap = Record<ResumeSectionKey, SectionStatus>

const VALID: SectionStatus = { valid: true, errorCount: 0 }

export function useSectionValidation(resumeId: string): {
  sections: SectionValidationMap
  completedCount: number
  totalCount: number
  progress: number
} {
  const resume = useResumeStore(selectResumeById(resumeId))

  return useMemo(() => {
    const fallback: SectionValidationMap = {
      personalInfo: VALID,
      summary: VALID,
      experience: VALID,
      education: VALID,
      skills: VALID,
      projects: VALID,
      certifications: VALID,
      languages: VALID,
      awards: VALID,
    }

    if (!resume) {
      return { sections: fallback, completedCount: 0, totalCount: 9, progress: 0 }
    }

    const piResult = validatePersonalInfo(resume.personalInfo)

    const summaryValid = resume.personalInfo.summary.trim().length > 0
    const summaryStatus: SectionStatus = {
      valid: summaryValid,
      errorCount: summaryValid ? 0 : 1,
    }

    const expErrors = resume.experience.reduce((sum, e) => sum + validateExperienceEntry(e).errors.length, 0)
    const eduErrors = resume.education.reduce((sum, e) => sum + validateEducationEntry(e).errors.length, 0)
    const skillErrors = resume.skills.reduce((sum, e) => sum + validateSkillEntry(e).errors.length, 0)
    const projErrors = resume.projects.reduce((sum, e) => sum + validateProjectEntry(e).errors.length, 0)
    const certErrors = resume.certifications.reduce((sum, e) => sum + validateCertificationEntry(e).errors.length, 0)
    const langErrors = resume.languages.reduce((sum, e) => sum + validateLanguageEntry(e).errors.length, 0)

    const sections: SectionValidationMap = {
      personalInfo: { valid: piResult.valid, errorCount: piResult.errors.length },
      summary: summaryStatus,
      experience: { valid: expErrors === 0, errorCount: expErrors },
      education: { valid: eduErrors === 0, errorCount: eduErrors },
      skills: { valid: skillErrors === 0, errorCount: skillErrors },
      projects: { valid: projErrors === 0, errorCount: projErrors },
      certifications: { valid: certErrors === 0, errorCount: certErrors },
      languages: { valid: langErrors === 0, errorCount: langErrors },
      awards: VALID,
    }

    const activeSections = resume.sections as ResumeSectionKey[]
    const completedCount = activeSections.filter((k) => sections[k].valid).length
    const totalCount = activeSections.length
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

    return { sections, completedCount, totalCount, progress }
  }, [resume])
}
