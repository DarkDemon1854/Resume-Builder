import { memo } from 'react'
import type { ComponentType } from 'react'
import type { NormalizedResume } from '@/templates/types'

type Props = {
  TemplateComponent: ComponentType<{ resume: NormalizedResume }>
  normalizedResume: NormalizedResume
}

function PreviewSectionRendererInner({ TemplateComponent, normalizedResume }: Props) {
  return (
    <div className="template-enter">
      <TemplateComponent resume={normalizedResume} />
    </div>
  )
}

export default memo(PreviewSectionRendererInner)
