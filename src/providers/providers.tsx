'use client';

import type { PropsWithChildren } from 'react';
import { QueryProvider } from './query-provider';
import { SmoothScrollProvider } from './smooth-scroll-provider';

export function AppProviders({ children }: PropsWithChildren): JSX.Element {
  return (
    <QueryProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </QueryProvider>
  );
}
