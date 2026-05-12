'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

/**
 * Lightweight canvas particle field.
 * - Adapts to DPI without cumulative scale leaks
 * - Pauses when tab is hidden (battery/CPU friendly)
 * - No-op when prefers-reduced-motion
 */
export function ParticleField({ density = 0.00008 }: { density?: number }): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let rafId = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const createParticle = (w: number, h: number): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.6 + 0.2,
    });

    const resize = (): void => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor(w * h * density);
      particles = Array.from({ length: count }, () => createParticle(w, h));
    };

    const frame = (): void => {
      if (!running) return;
      const { innerWidth: w, innerHeight: h } = window;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(263, 90%, 80%, ${p.a})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(frame);
    };

    const onVisibility = (): void => {
      running = !document.hidden;
      if (running) rafId = requestAnimationFrame(frame);
      else cancelAnimationFrame(rafId);
    };

    resize();
    rafId = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
