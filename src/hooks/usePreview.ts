import { useMemo } from 'react'
import { useResumeStore, selectResumeById } from '@/store/resumeStore'
import { getTemplate, TEMPLATE_REGISTRY } from '@/templates'
import { normalizeResume } from '@/templates/normalize'
import type { NormalizedResume, TemplateConfig } from '@/templates/types'
import type { TemplateId } from '@/constants'
import type { ComponentType } from 'react'

type PreviewData = {
  TemplateComponent: ComponentType<{ resume: NormalizedResume }>
  normalizedResume: NormalizedResume
  templateMeta: TemplateConfig['meta']
  templateId: TemplateId
  isEmpty: boolean
}

export function usePreview(resumeId: string): PreviewData | null {
  const resume = useResumeStore(selectResumeById(resumeId))

  return useMemo(() => {
    if (!resume) return null

    const normalized = normalizeResume(resume)
    const tid = (resume.templateId in TEMPLATE_REGISTRY
      ? resume.templateId
      : 'modern') as TemplateId
    const config = getTemplate(tid)

    const isEmpty =
      !normalized.personalInfo.fullName &&
      normalized.experience.length === 0 &&
      normalized.education.length === 0 &&
      normalized.skills.length === 0 &&
      normalized.projects.length === 0

    return {
      TemplateComponent: config.component,
      normalizedResume: normalized,
      templateMeta: config.meta,
      templateId: tid,
      isEmpty,
    }
  }, [resume])
}
