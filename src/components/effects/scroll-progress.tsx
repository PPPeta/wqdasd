'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Page-wide scroll indicator. Uses `transform: scaleX` for GPU compositor path.
 */
export function ScrollProgress(): JSX.Element {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-brand-400 via-fuchsia-500 to-sky-400"
    />
  );
}
