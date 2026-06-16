import { TEMPLATE_IDS } from '@/constants'
import type { TemplateId } from '@/constants'
import type { TemplateConfig } from './types'
import { TEMPLATE_REGISTRY } from './registry'

export function getTemplate(id: TemplateId): TemplateConfig {
  return TEMPLATE_REGISTRY[id]
}

export function listTemplates(): TemplateConfig[] {
  return TEMPLATE_IDS.map(id => TEMPLATE_REGISTRY[id])
}
