# Nebula Landing

A production-grade, heavily animated landing page built with **Next.js 14 App Router**, **React 18**, **TypeScript (strict)**, **Tailwind CSS**, **Framer Motion**, **TanStack Query**, **Zustand**, and **Lenis**.

## Stack

- **Framework:** Next.js 14 (App Router, RSC)
- **Language:** TypeScript (strict, `noUncheckedIndexedAccess`)
- **Styling:** Tailwind CSS + design tokens via CSS variables
- **Animation:** Framer Motion + Lenis smooth scroll
- **State:** Zustand (UI), TanStack Query (server)
- **A11y:** Radix UI primitives, reduced-motion aware, skip link, focus rings

## Scripts

```bash
pnpm install          # install dependencies
pnpm dev              # local dev server
pnpm build && pnpm start
pnpm lint             # Next + TS ESLint
pnpm type-check       # strict TS
```

## Dependencies

Runtime:

```
next react react-dom
framer-motion lenis
@tanstack/react-query
@radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-slot
zustand class-variance-authority clsx tailwind-merge lucide-react
```

Dev:

```
typescript @types/react @types/react-dom @types/node
tailwindcss tailwindcss-animate postcss autoprefixer
eslint eslint-config-next
```

## Architecture

```
src/
├─ app/                 Next.js App Router (layout, page, error, loading, not-found)
├─ components/
│  ├─ effects/          Pure visual effects (cursor, particles, scramble, blobs, progress)
│  ├─ layout/           Navbar, Footer
│  ├─ sections/         One file per landing section (composition-first)
│  └─ ui/               Reusable primitives (Button, Section, Reveal, TiltCard…)
├─ hooks/               use-magnetic, use-media-query, use-mounted
├─ lib/                 constants, fonts, utils
├─ providers/           AppProviders, QueryProvider, SmoothScrollProvider
└─ store/               Zustand UI store
```

## Animations included

- Magnetic hover buttons (pointer-adaptive, respects `prefers-reduced-motion`)
- Custom cursor with blend-mode + interactive expansion (auto-disabled on touch)
- Scroll progress bar (GPU transform)
- Text scramble / decrypt effect
- 3D tilt cards with spotlight glow
- Parallax hero, animated workflow timeline, animated counters
- Particle starfield canvas, aurora gradient blobs, noise texture overlay
- Infinite marquee logo cloud, sticky hide-on-scroll navbar
- Radix accordion with motion reveals
- Animated mobile nav with stagger

## Accessibility

- `prefers-reduced-motion` short-circuits all non-essential motion
- Semantic landmarks, skip-to-content link
- `:focus-visible` rings everywhere
- ARIA on interactive custom widgets (navbar, accordion)
- Coarse-pointer detection disables custom cursor
