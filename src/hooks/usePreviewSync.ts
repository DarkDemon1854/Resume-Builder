import { useResumeStore } from '@/store/resumeStore'

export function usePreviewSync(resumeId: string) {
  const resume = useResumeStore(
    state => state.resumes.find(r => r.id === resumeId) ?? null
  )

  const templateId = resume?.templateId ?? null
  const updatedAt = resume?.updatedAt ?? null

  return { resume, templateId, updatedAt }
}
