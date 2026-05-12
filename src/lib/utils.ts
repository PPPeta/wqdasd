import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind class names, resolving conflicts correctly.
 * Centralised to keep component code clean (DRY).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Clamps a number between min and max.
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/**
 * Linear interpolation between two numbers.
 */
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/**
 * Formats numbers with locale-aware thousand separators.
 */
export const formatNumber = (value: number, locale = 'en-US'): string =>
  new Intl.NumberFormat(locale).format(value);
