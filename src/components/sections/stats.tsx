'use client';

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, type FC } from 'react';
import { STATS } from '@/lib/constants';
import { Reveal } from '@/components/ui/reveal';

/**
 * Accessible animated counter.
 * Parses the numeric part of `value`, animates 0 → numeric, preserves formatting.
 */
const AnimatedValue: FC<{ value: string }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  const numeric = match ? Number.parseFloat(match[2] ?? '0') : NaN;

  useEffect(() => {
    if (!inView || !ref.current || !match || !Number.isFinite(numeric)) return;
    const prefix = match[1] ?? '';
    const suffix = match[3] ?? '';
    const hasDecimal = (match[2] ?? '').includes('.');

    const controls = animate(0, numeric, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (!ref.current) return;
        const formatted = hasDecimal ? latest.toFixed(2) : Math.round(latest).toString();
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, match, numeric]);

  return <span ref={ref}>{Number.isFinite(numeric) ? `${match?.[1] ?? ''}0${match?.[3] ?? ''}` : value}</span>;
};

export function Stats(): JSX.Element {
  return (
    <section aria-labelledby="stats-heading" className="relative py-16 sm:py-20">
      <div className="container">
        <h2 id="stats-heading" className="sr-only">
          Platform metrics
        </h2>
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 lg:grid-cols-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="relative flex flex-col items-start gap-2 bg-background/80 p-6 backdrop-blur-sm sm:p-8"
                >
                  <Icon className="h-5 w-5 text-brand-300" aria-hidden />
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-3xl font-semibold sm:text-4xl">
                    <AnimatedValue value={stat.value} />
                  </dd>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
