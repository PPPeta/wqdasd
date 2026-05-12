'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { WORKFLOW_STEPS } from '@/lib/constants';

export function Workflow(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <Section
      id="workflow"
      eyebrow="How it works"
      heading="Three steps. Zero yak shaving."
      description="Capture the signal. Compose the logic. Compound the outcomes. Nebula turns every run into institutional memory."
    >
      <div ref={ref} className="relative mx-auto max-w-4xl">
        <div aria-hidden className="absolute left-[19px] top-0 hidden h-full w-px bg-white/10 sm:block" />
        <motion.div
          aria-hidden
          style={{ height: lineHeight }}
          className="absolute left-[19px] top-0 hidden w-px bg-gradient-to-b from-brand-400 via-fuchsia-500 to-sky-400 sm:block"
        />
        <ol className="space-y-12">
          {WORKFLOW_STEPS.map((step, i) => (
            <Reveal as="li" key={step.index} delay={i * 0.08} className="relative pl-0 sm:pl-14">
              <span
                aria-hidden
                className="absolute left-0 top-1 hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-background font-mono text-xs text-brand-300 shadow-glow sm:flex"
              >
                {step.index}
              </span>
              <div className="rounded-2xl glass p-6 sm:p-8">
                <div className="flex items-center gap-3 sm:hidden">
                  <span className="font-mono text-xs text-brand-300">{step.index}</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold sm:mt-0">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {step.description}
                </p>
                <pre className="mt-5 overflow-x-auto rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs text-brand-100">
                  <code>{step.snippet}</code>
                </pre>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
