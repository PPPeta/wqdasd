import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = HTMLAttributes<HTMLElement> & {
  id?: string;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  align?: 'start' | 'center';
};

export function Section({
  id,
  eyebrow,
  heading,
  description,
  align = 'center',
  className,
  children,
  ...rest
}: SectionProps): JSX.Element {
  return (
    <section
      id={id}
      className={cn('relative py-24 sm:py-32 lg:py-40', className)}
      {...rest}
    >
      <div className="container relative">
        {(eyebrow || heading || description) && (
          <SectionHeader align={align}>
            {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
            {heading && <SectionHeading>{heading}</SectionHeading>}
            {description && <SectionDescription>{description}</SectionDescription>}
          </SectionHeader>
        )}
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  align = 'center',
  className,
  children,
}: PropsWithChildren<{ align?: 'start' | 'center'; className?: string }>): JSX.Element {
  return (
    <header
      className={cn(
        'mx-auto mb-16 flex max-w-3xl flex-col gap-4 sm:mb-20',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {children}
    </header>
  );
}

export function SectionEyebrow({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-glow animate-pulse-glow" />
      {children}
    </div>
  );
}

export function SectionHeading({ children }: PropsWithChildren): JSX.Element {
  return (
    <h2 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
      {children}
    </h2>
  );
}

export function SectionDescription({ children }: PropsWithChildren): JSX.Element {
  return (
    <p className="text-balance max-w-2xl text-base text-muted-foreground sm:text-lg">
      {children}
    </p>
  );
}
