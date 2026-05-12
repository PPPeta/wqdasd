import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, children, ...rest }: HTMLAttributes<HTMLSpanElement>): JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground',
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
