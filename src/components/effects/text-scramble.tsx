'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';

type TextScrambleProps = {
  text: string;
  className?: string;
  duration?: number;
};

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

const randomChar = (): string => {
  const i = Math.floor(Math.random() * CHARS.length);
  return CHARS[i] ?? '*';
};

/**
 * Classic "text decrypt" effect. Plays once on mount.
 * Falls back to the final string instantly for reduced-motion users.
 */
export function TextScramble({ text, className, duration = 1200 }: TextScrambleProps): JSX.Element {
  const [output, setOutput] = useState(text);
  const reduced = usePrefersReducedMotion();
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setOutput(text);
      return;
    }
    let rafId = 0;
    const total = text.length;

    const tick = (t: number): void => {
      if (startRef.current === null) startRef.current = t;
      const progress = Math.min(1, (t - startRef.current) / duration);
      const revealed = Math.floor(progress * total);
      let next = '';
      for (let i = 0; i < total; i++) {
        const ch = text[i] ?? '';
        if (i < revealed || ch === ' ') {
          next += ch;
        } else {
          next += randomChar();
        }
      }
      setOutput(next);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [text, duration, reduced]);

  return (
    <span className={className} aria-label={text}>
      {output}
    </span>
  );
}
