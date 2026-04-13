import type { ReactNode } from "react"
import React from "react"

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

type State = {
  error: unknown | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: unknown): State {
    return { error }
  }

  componentDidCatch(error: unknown) {
    // Keep signal in console; avoid crashing to blank screen.
    console.error("UI crashed:", error)
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div className="h-full w-full bg-white">
            <div className="flex h-full min-h-0 flex-col px-6 pb-8 pt-[92px]">
              <p className="mb-4 text-nav opacity-60">Something went wrong</p>
              <p className="mb-6 max-w-[640px] text-bodymd leading-[1.6] tracking-nav text-ink/80 md:text-body">
                The page crashed while rendering. Check the console for details and try navigating again.
              </p>
              <button
                type="button"
                onClick={() => this.setState({ error: null })}
                className="w-fit text-nav uppercase tracking-nav text-ink underline underline-offset-4 transition-opacity duration-200 hover:opacity-40"
              >
                Retry
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

