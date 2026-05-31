import { Component, type ReactNode, type ErrorInfo } from 'react'
import Button from '@/components/Button'

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

type State = {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error.message, info.componentStack)
  }

  private reset = () => { this.setState({ hasError: false, error: null }) }

  render() {
    if (!this.state.hasError) return this.props.children

    if (this.props.fallback) return this.props.fallback

    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center gap-6 p-8 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-danger-500/10 border border-danger-500/30 flex items-center justify-center mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-danger-400"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div>
          <h1 className="text-xl font-bold text-neutral-50 mb-2">Something went wrong</h1>
          <p className="text-sm text-neutral-400 max-w-sm mx-auto text-balance">
            An unexpected error occurred. You can try again or refresh the page.
          </p>
          {this.state.error?.message && (
            <p className="mt-3 text-xs text-neutral-600 font-mono max-w-sm mx-auto break-words px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800">
              {this.state.error.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button id="error-boundary-retry" variant="primary" onClick={this.reset}>
            Try again
          </Button>
          <Button
            id="error-boundary-refresh"
            variant="secondary"
            onClick={() => { window.location.reload() }}
          >
            Refresh page
          </Button>
        </div>
      </div>
    )
  }
}
