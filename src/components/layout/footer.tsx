import Link from 'next/link';
import { FOOTER_LINKS, SITE_CONFIG, SOCIALS } from '@/lib/constants';

export function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/5 bg-background/40 pt-20 pb-10 backdrop-blur-sm">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" />
      <div className="container grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 shadow-glow">
              <span className="font-display text-sm font-bold text-white">N</span>
            </span>
            <span className="font-display text-lg font-semibold">{SITE_CONFIG.name}</span>
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            {SITE_CONFIG.description}
          </p>
          <ul className="flex items-center gap-3 pt-2">
            {SOCIALS.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full glass text-muted-foreground transition-colors hover:text-foreground"
                >
                  <s.icon className="h-4 w-4" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {FOOTER_LINKS.map((group) => (
          <div key={group.title} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {group.title}
            </h3>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container mt-16 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {year} {SITE_CONFIG.name}. Crafted with care on a pale blue dot.</p>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-foreground">Privacy</Link>
          <Link href="#" className="hover:text-foreground">Terms</Link>
          <Link href="#" className="hover:text-foreground">Security</Link>
        </div>
      </div>
    </footer>
  );
}
