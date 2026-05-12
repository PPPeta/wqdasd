'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/use-media-query';

/**
 * Floating custom cursor. Expands over interactive elements (a, button, [data-cursor="hover"]).
 * Disabled on coarse pointers and reduced-motion users for A11y.
 */
export function CustomCursor(): JSX.Element | null {
  const isCoarse = useMediaQuery('(pointer: coarse)');
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isCoarse || reduced) return;

    const onMove = (e: MouseEvent): void => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent): void => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"], [data-cursor="hover"]');
      setHovering(Boolean(interactive));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [isCoarse, reduced, visible, x, y]);

  if (isCoarse || reduced) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          scale: hovering ? 1.6 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ scale: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference"
        style={{
          x,
          y,
          scale: hovering ? 0.4 : 1,
          opacity: visible ? 0.5 : 0,
        }}
        transition={{ scale: { duration: 0.3 }, opacity: { duration: 0.2 } }}
      />
    </>
  );
}
