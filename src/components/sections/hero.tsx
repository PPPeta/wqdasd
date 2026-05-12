'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GradientBlobs } from '@/components/effects/gradient-blobs';
import { ParticleField } from '@/components/effects/particle-field';
import { TextScramble } from '@/components/effects/text-scramble';
import { useMagnetic } from '@/hooks/use-magnetic';

export function Hero(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const primaryMagnet = useMagnetic<HTMLAnchorElement>({ strength: 0.25 });
  const secondaryMagnet = useMagnetic<HTMLAnchorElement>({ strength: 0.2 });

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-32"
      aria-labelledby="hero-heading"
    >
      <GradientBlobs />
      <ParticleField />
      <div aria-hidden className="absolute inset-0 bg-grid-pattern bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      <motion.div style={{ y, opacity }} className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8 text-center"
        >
          <Badge>
            <Sparkles className="h-3 w-3 text-brand-300" aria-hidden />
            <span className="text-foreground/90">New: Nebula 3.0 is live</span>
            <span className="h-3 w-px bg-white/15" />
            <Link href="#" className="text-brand-300 hover:underline">
              Read the launch →
            </Link>
          </Badge>

          <h1
            id="hero-heading"
            className="text-balance font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl"
          >
            The operating system
            <br />
            for teams that{' '}
            <span className="gradient-text-brand italic">
              <TextScramble text="ship." duration={1400} />
            </span>
          </h1>

          <p className="text-balance max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Docs, tasks, and AI agents in one galaxy-fast workspace. Turn chaos into a compound
            graph — and let Nebula do the rest while you build.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link
                href="#pricing"
                ref={primaryMagnet.ref}
                onMouseMove={primaryMagnet.onMouseMove}
                onMouseLeave={primaryMagnet.onMouseLeave}
              >
                Start free trial
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link
                href="#workflow"
                ref={secondaryMagnet.ref}
                onMouseMove={secondaryMagnet.onMouseMove}
                onMouseLeave={secondaryMagnet.onMouseLeave}
              >
                <PlayCircle className="h-4 w-4" aria-hidden />
                Watch the 90s demo
              </Link>
            </Button>
          </div>

          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            No credit card · 14-day trial · Cancel anytime
          </p>

          <Link
            href="/doom"
            className="group/doom inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-red-300 transition-all hover:border-red-500/60 hover:bg-red-500/10 hover:text-red-200"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
            Play DOOM in your browser →
          </Link>
        </motion.div>

        <HeroDashboardPreview />
      </motion.div>

      <ScrollCue />
    </section>
  );
}

function HeroDashboardPreview(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="relative mx-auto mt-16 w-full max-w-5xl"
    >
      <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-gradient-to-b from-brand-500/30 via-fuchsia-500/10 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-rose-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <span className="ml-4 font-mono text-xs text-muted-foreground">
            nebula.app/workspace/arcfield/sprint-42
          </span>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-[220px_1fr]">
          <div className="hidden space-y-2 sm:block">
            {['Inbox', 'Roadmap', 'Specs', 'Agents', 'Docs'].map((label, i) => (
              <div
                key={label}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  i === 2 ? 'bg-brand-500/15 text-foreground' : 'text-muted-foreground'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                {label}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[
              { title: 'Q3 planning doc', meta: 'Ava · AI drafted 2 min ago', tone: 'bg-emerald-500/20' },
              { title: 'Ship realtime cursors', meta: 'Agent: triage · 3 files', tone: 'bg-sky-500/20' },
              { title: 'Design review: onboarding', meta: '4 comments · 2 resolved', tone: 'bg-fuchsia-500/20' },
              { title: 'Security audit', meta: 'Due in 3 days', tone: 'bg-amber-500/20' },
            ].map((row) => (
              <motion.div
                key={row.title}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className={`h-8 w-8 rounded-lg ${row.tone}`} />
                  <div>
                    <p className="text-sm font-medium">{row.title}</p>
                    <p className="text-xs text-muted-foreground">{row.meta}</p>
                  </div>
                </div>
                <span className="hidden font-mono text-xs text-muted-foreground sm:block">
                  ⌘K
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ScrollCue(): JSX.Element {
  return (
    <div
      aria-hidden
      className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground md:flex"
    >
      <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
      <span className="relative h-10 w-6 rounded-full border border-white/20">
        <motion.span
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/80"
        />
      </span>
    </div>
  );
}
