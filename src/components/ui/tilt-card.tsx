'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useCallback, type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';

type TiltCardProps = PropsWithChildren<{
  className?: string;
  intensity?: number;
}>;

/**
 * 3D tilt + glow spotlight that follows the pointer.
 * Gracefully no-ops for reduced motion.
 */
export function TiltCard({ children, className, intensity = 10 }: TiltCardProps): JSX.Element {
  const reduced = usePrefersReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const background = useMotionTemplate`radial-gradient(280px circle at ${glowX}% ${glowY}%, hsl(263 90% 75% / 0.18), transparent 60%)`;

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (reduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      rotateY.set((x - 0.5) * intensity);
      rotateX.set((0.5 - y) * intensity);
      glowX.set(x * 100);
      glowY.set(y * 100);
    },
    [glowX, glowY, intensity, reduced, rotateX, rotateY]
  );

  const handleLeave = useCallback((): void => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn(
        'group relative isolate overflow-hidden rounded-2xl glass transition-colors hover:border-white/20',
        className
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
}
