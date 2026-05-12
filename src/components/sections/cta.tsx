'use client';

import { ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';

export function Cta(): JSX.Element {
  return (
    <section aria-labelledby="cta-heading" className="relative py-24 sm:py-32">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-500/20 via-fuchsia-500/10 to-sky-500/10 p-10 sm:p-14 lg:p-20">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(263_90%_70%/0.25),transparent_50%),radial-gradient(circle_at_bottom_right,hsl(199_89%_60%/0.2),transparent_50%)]"
            />
            <div aria-hidden className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

            <div className="relative z-10 flex flex-col items-start gap-6 text-left sm:items-center sm:text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-brand-100">
                <Sparkles className="h-3 w-3" aria-hidden />
                Launch week — 40% off annual plans
              </span>
              <h2
                id="cta-heading"
                className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
              >
                Your team deserves a<br className="hidden sm:inline" />{' '}
                <span className="gradient-text-brand italic">better workspace.</span>
              </h2>
              <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                Join 12,000+ teams who traded tab-fatigue for flow state. Free for 14 days, set up in minutes.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="#">
                    Start free trial
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#">Book a live demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
