'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { FAQ } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Faq(): JSX.Element {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      heading="Frequently asked, honestly answered."
      description="Can't find what you're looking for? Reach us anytime at hello@nebula.example.com."
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
            {FAQ.map((item, i) => (
              <Accordion.Item
                key={item.q}
                value={`item-${i}`}
                className={cn(
                  'overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors',
                  'data-[state=open]:border-brand-400/30 data-[state=open]:bg-white/[0.04]'
                )}
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      'group flex w-full items-center justify-between gap-4 p-5 text-left text-base font-medium sm:p-6',
                      'focus-visible:outline-none'
                    )}
                  >
                    <span>{item.q}</span>
                    <Plus
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:text-brand-300"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                  className={cn(
                    'overflow-hidden text-sm leading-relaxed text-muted-foreground',
                    'data-[state=open]:animate-fade-in'
                  )}
                >
                  <p className="px-5 pb-5 sm:px-6 sm:pb-6">{item.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </Section>
  );
}
