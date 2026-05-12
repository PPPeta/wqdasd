'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-full font-medium tracking-tight transition-all duration-300',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50 overflow-hidden',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 text-white shadow-glow',
          'hover:shadow-glow-lg hover:brightness-110',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent',
          'before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-full',
        ],
        secondary: [
          'glass text-foreground hover:bg-white/[0.06]',
          'hover:border-white/20',
        ],
        ghost: 'text-muted-foreground hover:text-foreground hover:bg-white/5',
        outline: 'border border-white/15 text-foreground hover:bg-white/5 hover:border-white/25',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-7 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { buttonVariants };
