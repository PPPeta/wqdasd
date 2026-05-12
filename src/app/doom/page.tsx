import type { Metadata } from 'next';
import Link from 'next/link';
import { DoomGame } from '@/components/doom/doom-game';

export const metadata: Metadata = {
  title: 'DOOM · Nebula',
  description:
    'A browser-playable DOOM-style raycasting shooter. WASD to move, mouse to aim, click to shoot.',
};

export default function DoomPage(): JSX.Element {
  return (
    <main className="relative min-h-screen bg-black px-4 py-10 sm:py-16">
      <div className="container mx-auto flex flex-col items-center gap-8">
        <header className="flex flex-col items-center gap-3 text-center">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.18em] text-white/50 hover:text-white"
          >
            ← Back to Nebula
          </Link>
          <h1
            className="font-display text-5xl font-bold tracking-tight sm:text-7xl"
            style={{ color: '#ff3020', textShadow: '0 0 30px #ff3020' }}
          >
            DOOM
          </h1>
          <p className="max-w-md text-sm text-white/60">
            A faithful-ish raycasting engine. Procedurally textured walls,
            sprite-based demons, hitscan shotgun, synth audio. All in your browser.
          </p>
        </header>

        <DoomGame />

        <footer className="grid w-full max-w-3xl gap-4 text-xs text-white/50 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="mb-2 font-semibold uppercase tracking-widest text-white/70">
              Controls
            </p>
            <ul className="space-y-1 font-mono">
              <li>WASD — move</li>
              <li>Mouse — look</li>
              <li>LMB / Space — fire shotgun</li>
              <li>Arrow keys — turn (keyboard-only)</li>
              <li>R — restart after game over</li>
              <li>Esc — release mouse</li>
            </ul>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="mb-2 font-semibold uppercase tracking-widest text-white/70">
              Tech
            </p>
            <ul className="space-y-1 font-mono">
              <li>DDA raycasting @ 480×270</li>
              <li>Procedural textures + sprites</li>
              <li>Z-buffered billboard sprites</li>
              <li>Web Audio synthesis (no files)</li>
              <li>Strict TypeScript, zero deps</li>
            </ul>
          </div>
        </footer>
      </div>
    </main>
  );
}
