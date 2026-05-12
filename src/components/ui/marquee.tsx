import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type MarqueeProps = PropsWithChildren<{
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
}>;

/**
 * CSS-only infinite marquee. Duplicates children once to create the loop.
 */
export function Marquee({
  children,
  className,
  pauseOnHover = true,
  reverse = false,
}: MarqueeProps): JSX.Element {
  return (
    <div
      className={cn(
        'relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className
      )}
    >
      <div
        className={cn(
          'flex min-w-full shrink-0 gap-10 pr-10 animate-marquee',
          pauseOnHover && 'hover:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]'
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          'flex min-w-full shrink-0 gap-10 pr-10 animate-marquee',
          pauseOnHover && 'hover:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]'
        )}
      >
        {children}
      </div>
    </div>
  );
}
