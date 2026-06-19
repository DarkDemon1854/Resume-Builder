import { useResumeStore } from '@/store/resumeStore'

export function usePreviewSync(resumeId: string) {
  const resume = useResumeStore(
    state => state.resumes.find(r => r.id === resumeId) ?? null
  )

  const templateId = useResumeStore(
    state => state.resumes.find(r => r.id === resumeId)?.templateId ?? null
  )

  const updatedAt = useResumeStore(
    state => state.resumes.find(r => r.id === resumeId)?.updatedAt ?? null
  )

  return { resume, templateId, updatedAt }
}
