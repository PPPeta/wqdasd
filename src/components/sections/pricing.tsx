'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { PRICING } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Pricing(): JSX.Element {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      heading="Simple, transparent, predictable."
      description="Start free. Scale when it makes sense. No per-seat traps, no surprise overages."
    >
      <ul className="grid gap-6 lg:grid-cols-3">
        {PRICING.map((tier, i) => (
          <Reveal as="li" key={tier.name} delay={i * 0.06} className="h-full">
            <article
              className={cn(
                'relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300',
                tier.featured
                  ? 'border-brand-400/40 bg-gradient-to-b from-brand-500/10 to-transparent shadow-glow'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              )}
            >
              {tier.featured && (
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-400 to-fuchsia-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-glow"
                >
                  Most popular
                </span>
              )}
              <header className="space-y-2">
                <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </header>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-5xl font-semibold tracking-tight">
                  {tier.price}
                </span>
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 border-t border-white/5 pt-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8 w-full"
                variant={tier.featured ? 'primary' : 'outline'}
                size="lg"
              >
                {tier.cta}
              </Button>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
