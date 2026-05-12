'use client';

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { useMemo, type ElementType, type PropsWithChildren } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';

type RevealTag = 'div' | 'section' | 'article' | 'li' | 'span' | 'ul' | 'ol';

type RevealProps = PropsWithChildren<{
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  as?: RevealTag;
}> &
  Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView' | 'viewport' | 'variants'>;

/**
 * Declarative, in-view reveal. Accessible: disables motion for reduced-motion users.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  once = true,
  className,
  as = 'div',
  ...rest
}: RevealProps): JSX.Element {
  const reduced = usePrefersReducedMotion();

  const variants = useMemo<Variants>(
    () => ({
      hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1], delay },
      },
    }),
    [reduced, y, delay]
  );

  // Narrow the motion component lookup without losing type-safety.
  const MotionTag = motion[as] as ElementType;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px' }}
      variants={variants}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
