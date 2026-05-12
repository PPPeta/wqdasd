import { Marquee } from '@/components/ui/marquee';
import { BRANDS } from '@/lib/constants';

export function LogoCloud(): JSX.Element {
  return (
    <section aria-label="Trusted by" className="relative border-y border-white/5 bg-background/40 py-10 backdrop-blur-sm">
      <div className="container">
        <p className="mb-8 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by the teams building tomorrow
        </p>
      </div>
      <Marquee className="opacity-70">
        {BRANDS.map((brand) => (
          <span
            key={brand.name}
            className="font-display text-2xl font-semibold tracking-tight text-foreground/50 transition-colors hover:text-foreground"
          >
            {brand.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
