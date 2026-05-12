import { Quote } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { TESTIMONIALS } from '@/lib/constants';

export function Testimonials(): JSX.Element {
  return (
    <Section
      eyebrow="Loved by teams"
      heading="They stopped stitching tools. They started shipping."
      description="The happiest customers are the quiet ones. Here are the loud ones."
    >
      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {TESTIMONIALS.map((t, i) => (
          <Reveal as="li" key={t.name} delay={i * 0.05} className="h-full">
            <figure className="group relative flex h-full flex-col justify-between rounded-2xl glass p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-white/20">
              <Quote className="h-6 w-6 text-brand-300" aria-hidden />
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                <span
                  className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-sm font-semibold text-white"
                  aria-hidden
                >
                  {t.name.charAt(0)}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
