import { useMemo } from 'react'
import { useResumeStore } from '@/store/resumeStore'

type PreviewSyncResult = {
  templateId: string | null
  updatedAt: string | null
  hasContent: boolean
}

export function usePreviewSync(resumeId: string): PreviewSyncResult {
  const resume = useResumeStore(
    state => state.resumes.find(r => r.id === resumeId) ?? null
  )

  return useMemo(() => {
    if (!resume) return { templateId: null, updatedAt: null, hasContent: false }

    const { personalInfo, experience, education, skills, projects } = resume
    const hasContent =
      Boolean(personalInfo.fullName.trim()) ||
      experience.length > 0 ||
      education.length > 0 ||
      skills.length > 0 ||
      projects.length > 0

    return {
      templateId: resume.templateId,
      updatedAt: resume.updatedAt,
      hasContent,
    }
  }, [resume])
}
