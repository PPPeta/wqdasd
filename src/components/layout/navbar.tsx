'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/store/ui-store';

export function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { isMobileNavOpen, toggleMobileNav, closeMobileNav } = useUiStore();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > 120 && latest > prev);
  });

  const onLinkClick = useCallback((): void => {
    closeMobileNav();
  }, [closeMobileNav]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            'flex w-full max-w-6xl items-center justify-between gap-6 rounded-full border px-4 py-2 transition-all duration-500',
            scrolled
              ? 'border-white/10 bg-background/70 backdrop-blur-xl shadow-[0_10px_60px_-20px_rgba(0,0,0,0.6)]'
              : 'border-transparent bg-transparent'
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-2 pl-2 pr-1"
            aria-label={`${SITE_CONFIG.name} home`}
          >
            <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 shadow-glow">
              <Sparkles className="h-4 w-4 text-white" aria-hidden />
              <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              {SITE_CONFIG.name}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative inline-flex items-center rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-400 to-fuchsia-400 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="#">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="#pricing">
                Get started
                <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
                  →
                </span>
              </Link>
            </Button>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full glass md:hidden"
            onClick={toggleMobileNav}
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              animate={{ rotate: isMobileNavOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex"
            >
              {isMobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </motion.span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                closed: {},
              }}
              className="flex h-full flex-col items-center justify-center gap-2 px-6"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    closed: { opacity: 0, y: 20 },
                    open: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onLinkClick}
                    className="font-display text-3xl font-semibold tracking-tight"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  closed: { opacity: 0, y: 20 },
                  open: { opacity: 1, y: 0 },
                }}
                className="mt-8 w-full max-w-xs"
              >
                <Button size="lg" className="w-full" asChild>
                  <Link href="#pricing" onClick={onLinkClick}>
                    Get started
                  </Link>
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
