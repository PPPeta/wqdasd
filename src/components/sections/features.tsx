import { FEATURES } from '@/lib/constants';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { TiltCard } from '@/components/ui/tilt-card';
import { cn } from '@/lib/utils';

export function Features(): JSX.Element {
  return (
    <Section
      id="features"
      eyebrow="Features"
      heading={<>Everything your team needs.<br className="hidden sm:inline" /> Nothing it doesn&rsquo;t.</>}
      description="Six primitives that quietly replace a dozen tools. Each one is fast, keyboard-first, and ridiculously composable."
    >
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Reveal
              key={feature.title}
              as="li"
              delay={index * 0.05}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div
                  aria-hidden
                  className={cn(
                    'absolute inset-x-0 top-0 h-40 bg-gradient-to-b opacity-80',
                    feature.accent
                  )}
                />
                <div className="relative flex h-full flex-col gap-4 p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-brand-200 shadow-inset">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
