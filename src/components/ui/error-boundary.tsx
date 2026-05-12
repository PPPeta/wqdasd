'use client';

import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';
import { Button } from './button';

type State = { hasError: boolean; error?: Error };
type Props = PropsWithChildren<{ fallback?: ReactNode }>;

/**
 * Route-level Error Boundary. Keeps the rest of the page alive when a subtree throws.
 */
export class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ErrorBoundary]', error, info.componentStack);
    }
    // Hook into Sentry / Datadog here.
  }

  private reset = (): void => this.setState({ hasError: false, error: undefined });

  override render(): ReactNode {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div
        role="alert"
        className="mx-auto my-24 flex max-w-md flex-col items-center gap-4 rounded-2xl glass p-10 text-center"
      >
        <h2 className="font-display text-2xl">Something went sideways</h2>
        <p className="text-sm text-muted-foreground">
          An unexpected error broke this section. The rest of the page should still work.
        </p>
        <Button size="sm" onClick={this.reset}>
          Try again
        </Button>
      </div>
    );
  }
}
