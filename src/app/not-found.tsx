import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound(): JSX.Element {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div className="flex flex-col items-center gap-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Error 404
        </p>
        <h1 className="font-display text-6xl font-semibold gradient-text-brand">
          Off the map.
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          This page drifted outside our observable universe. Let&rsquo;s get you back home.
        </p>
        <Button asChild>
          <Link href="/">Return to Nebula</Link>
        </Button>
      </div>
    </div>
  );
}
