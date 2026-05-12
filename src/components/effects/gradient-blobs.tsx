import { cn } from '@/lib/utils';

/** Background aurora blobs. Pure CSS, no JS, no runtime cost. */
export function GradientBlobs({ className }: { className?: string }): JSX.Element {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute left-1/2 top-[-10%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-brand-500/30 blur-[120px] animate-float" />
      <div
        className="absolute right-[-20%] top-[20%] h-[50vh] w-[50vh] rounded-full bg-sky-500/25 blur-[120px] animate-float"
        style={{ animationDelay: '-2s' }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] h-[55vh] w-[55vh] rounded-full bg-fuchsia-500/20 blur-[140px] animate-float"
        style={{ animationDelay: '-4s' }}
      />
    </div>
  );
}
