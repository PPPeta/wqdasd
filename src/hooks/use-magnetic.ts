'use client';

import { useCallback, useRef } from 'react';
import { usePrefersReducedMotion } from './use-media-query';

type MagneticOptions = {
  strength?: number;
  damping?: number;
};

type MagneticApi<T extends HTMLElement> = {
  ref: React.RefObject<T>;
  onMouseMove: (e: React.MouseEvent<T>) => void;
  onMouseLeave: () => void;
};

/**
 * Magnetic hover effect. Mouse position attracts the element toward the cursor.
 * No-op when the user prefers reduced motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  options: MagneticOptions = {}
): MagneticApi<T> {
  const { strength = 0.35, damping = 0.15 } = options;
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
      ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ref.current.style.transition = `transform ${damping}s cubic-bezier(.22,1,.36,1)`;
    },
    [damping, reduced, strength]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate3d(0, 0, 0)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
