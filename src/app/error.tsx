'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 rounded-2xl glass p-10 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-rose-500/60 to-brand-500/60 font-display text-xl">
          !
        </span>
        <h1 className="font-display text-3xl font-semibold">Signal lost</h1>
        <p className="text-sm text-muted-foreground">
          We ran into a cosmic anomaly rendering this page. It has been logged and we&rsquo;re on it.
        </p>
        {error.digest && (
          <code className="rounded bg-black/40 px-2 py-1 font-mono text-xs text-muted-foreground">
            ref: {error.digest}
          </code>
        )}
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
