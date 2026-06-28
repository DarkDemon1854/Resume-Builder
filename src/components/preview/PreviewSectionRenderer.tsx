import { memo, Component } from 'react'
import type { ComponentType, ReactNode, ErrorInfo } from 'react'
import type { NormalizedResume } from '@/templates/types'

type BoundaryState = { crashed: boolean }

class TemplateErrorBoundary extends Component<{ children: ReactNode }, BoundaryState> {
  state: BoundaryState = { crashed: false }

  static getDerivedStateFromError(): BoundaryState {
    return { crashed: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {}

  render() {
    if (this.state.crashed) {
      return (
        <div className="preview-template-error">
          <span>Template failed to render.</span>
        </div>
      )
    }
    return this.props.children
  }
}

type Props = {
  TemplateComponent: ComponentType<{ resume: NormalizedResume }>
  normalizedResume: NormalizedResume
}

function PreviewSectionRendererInner({ TemplateComponent, normalizedResume }: Props) {
  return (
    <TemplateErrorBoundary>
      <div className="template-enter">
        <TemplateComponent resume={normalizedResume} />
      </div>
    </TemplateErrorBoundary>
  )
}

export default memo(PreviewSectionRendererInner)
