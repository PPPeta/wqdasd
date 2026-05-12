'use client';

import Lenis from 'lenis';
import { useEffect, type PropsWithChildren } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';

/**
 * Wraps the app in a Lenis smooth-scroll instance.
 * Disabled automatically when `prefers-reduced-motion: reduce`.
 */
export function SmoothScrollProvider({ children }: PropsWithChildren): JSX.Element {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let rafId = 0;
    const raf = (time: number): void => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
