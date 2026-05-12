import type { Texture, WallMap } from './types';

export const WIDTH = 480;
export const HEIGHT = 270;
export const TEX_SIZE = 64;
export const SPRITE_SIZE = 64;

export const MOVE_SPEED = 3.2;
export const ROT_SPEED = 2.6;
export const MOUSE_SENS = 0.0025;
export const FIRE_COOLDOWN_MS = 280;
export const MAX_HEALTH = 100;
export const MAX_AMMO = 50;
export const DAMAGE_PER_SHOT = 50;
export const ENEMY_HEALTH = 75;
export const ENEMY_SPEED = 1.4;
export const ENEMY_ATTACK_RANGE = 0.9;
export const ENEMY_DAMAGE = 8;
export const ENEMY_ATTACK_COOLDOWN = 0.55;

// 0 = empty, 1..5 = wall type
export const MAP: WallMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 2, 2, 0, 0, 0, 5, 5, 0, 0, 0, 2, 2, 0, 1],
  [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1],
  [1, 0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 5, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 5, 0, 1],
  [1, 0, 5, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 5, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 1],
  [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1],
  [1, 0, 2, 2, 0, 0, 0, 5, 5, 0, 0, 0, 2, 2, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const ENEMY_SPAWNS: ReadonlyArray<{ x: number; y: number }> = [
  { x: 7.5, y: 7.5 },
  { x: 12.5, y: 3.5 },
  { x: 3.5, y: 12.5 },
  { x: 12.5, y: 12.5 },
  { x: 8.5, y: 9.5 },
  { x: 3.5, y: 3.5 },
  { x: 12.5, y: 8.5 },
  { x: 8.5, y: 3.5 },
];

type Rgb = readonly [number, number, number];

const mulberry32 = (a: number) => (): number => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = a;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const setPixel = (
  data: Uint8ClampedArray,
  w: number,
  x: number,
  y: number,
  [r, g, b]: Rgb,
  a = 255
): void => {
  const idx = (y * w + x) * 4;
  data[idx] = r;
  data[idx + 1] = g;
  data[idx + 2] = b;
  data[idx + 3] = a;
};

function createBrickTexture(): Texture {
  const w = TEX_SIZE;
  const data = new Uint8ClampedArray(w * w * 4);
  const rand = mulberry32(1);
  for (let y = 0; y < w; y++) {
    for (let x = 0; x < w; x++) {
      const row = Math.floor(y / 8);
      const offset = row % 2 === 0 ? 0 : 8;
      const isMortar = y % 8 === 0 || (x + offset) % 16 === 0;
      if (isMortar) {
        const n = rand() * 15;
        setPixel(data, w, x, y, [25 + n, 22 + n, 20 + n]);
      } else {
        const n = (rand() - 0.5) * 40;
        setPixel(data, w, x, y, [130 + n, 45 + n * 0.6, 35 + n * 0.4]);
      }
    }
  }
  return { width: w, height: w, data };
}

function createStoneTexture(): Texture {
  const w = TEX_SIZE;
  const data = new Uint8ClampedArray(w * w * 4);
  const rand = mulberry32(7);
  for (let y = 0; y < w; y++) {
    for (let x = 0; x < w; x++) {
      const cell = (Math.floor(x / 16) + Math.floor(y / 16)) % 2;
      const base = cell ? 95 : 80;
      const n = (rand() - 0.5) * 35;
      const v = Math.max(0, Math.min(255, base + n));
      const edge = x % 16 === 0 || y % 16 === 0 ? -25 : 0;
      setPixel(data, w, x, y, [v + edge, v + edge, v + edge + 5]);
    }
  }
  return { width: w, height: w, data };
}

function createMetalTexture(): Texture {
  const w = TEX_SIZE;
  const data = new Uint8ClampedArray(w * w * 4);
  const rand = mulberry32(13);
  for (let y = 0; y < w; y++) {
    for (let x = 0; x < w; x++) {
      const band = Math.abs(Math.sin(y * 0.3)) * 25;
      const n = (rand() - 0.5) * 15;
      const base = 75 + band + n;
      const rivet =
        (x % 32 === 4 || x % 32 === 28) && (y % 32 === 4 || y % 32 === 28);
      if (rivet) {
        setPixel(data, w, x, y, [40, 40, 45]);
      } else {
        setPixel(data, w, x, y, [base, base + 5, base + 15]);
      }
    }
  }
  return { width: w, height: w, data };
}

function createWoodTexture(): Texture {
  const w = TEX_SIZE;
  const data = new Uint8ClampedArray(w * w * 4);
  const rand = mulberry32(23);
  for (let y = 0; y < w; y++) {
    for (let x = 0; x < w; x++) {
      const grain = Math.sin(y * 0.3 + Math.sin(x * 0.05) * 3) * 20;
      const plank = y % 16 === 0 ? -30 : 0;
      const n = (rand() - 0.5) * 12;
      const r = 90 + grain + plank + n;
      const g = 55 + grain * 0.5 + plank + n;
      const b = 30 + grain * 0.3 + plank + n;
      setPixel(data, w, x, y, [r, g, b]);
    }
  }
  return { width: w, height: w, data };
}

function createTechTexture(): Texture {
  const w = TEX_SIZE;
  const data = new Uint8ClampedArray(w * w * 4);
  for (let y = 0; y < w; y++) {
    for (let x = 0; x < w; x++) {
      const panelX = x % 32;
      const panelY = y % 32;
      const edge = panelX < 2 || panelY < 2 || panelX > 29 || panelY > 29;
      const light =
        panelX >= 12 && panelX <= 18 && panelY >= 12 && panelY <= 18;
      if (light) {
        const cx = panelX - 15;
        const cy = panelY - 15;
        const d = Math.sqrt(cx * cx + cy * cy);
        const glow = Math.max(0, 1 - d / 4);
        setPixel(data, w, x, y, [50 + glow * 180, 200 + glow * 55, 80 + glow * 100]);
      } else if (edge) {
        setPixel(data, w, x, y, [15, 20, 25]);
      } else {
        const stripe = Math.abs(Math.sin(y * 0.4)) * 15;
        setPixel(data, w, x, y, [35 + stripe, 50 + stripe, 65 + stripe]);
      }
    }
  }
  return { width: w, height: w, data };
}

export function createTextures(): readonly Texture[] {
  return [
    createBrickTexture(),
    createStoneTexture(),
    createMetalTexture(),
    createWoodTexture(),
    createTechTexture(),
  ];
}

/**
 * Renders the enemy "imp" sprite by drawing shapes on an offscreen canvas and
 * reading pixels. Falls back to a plain buffer if the canvas API is unavailable.
 */
export function createImpSprite(variant: 'alive' | 'dead'): Texture {
  const size = SPRITE_SIZE;
  if (typeof document === 'undefined') {
    return { width: size, height: size, data: new Uint8ClampedArray(size * size * 4) };
  }
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { width: size, height: size, data: new Uint8ClampedArray(size * size * 4) };

  ctx.clearRect(0, 0, size, size);

  if (variant === 'dead') {
    // Flattened remains
    ctx.fillStyle = '#4a1a10';
    ctx.beginPath();
    ctx.ellipse(32, 54, 22, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#7a2a18';
    ctx.beginPath();
    ctx.ellipse(32, 52, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff2010';
    for (let i = 0; i < 8; i++) {
      const x = 14 + i * 5;
      ctx.fillRect(x, 50 + ((i * 3) % 5), 2, 2);
    }
    return {
      width: size,
      height: size,
      data: ctx.getImageData(0, 0, size, size).data,
    };
  }

  // Body (torso)
  ctx.fillStyle = '#5a2a18';
  ctx.beginPath();
  ctx.ellipse(32, 44, 18, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Belly highlight
  ctx.fillStyle = '#75341c';
  ctx.beginPath();
  ctx.ellipse(32, 46, 10, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Arms
  ctx.fillStyle = '#4a2010';
  ctx.beginPath();
  ctx.ellipse(14, 40, 7, 10, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(50, 40, 7, 10, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // Claws
  ctx.fillStyle = '#2a1508';
  ctx.fillRect(8, 46, 10, 4);
  ctx.fillRect(46, 46, 10, 4);
  ctx.fillStyle = '#e8e0c0';
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(9 + i * 3, 50, 2, 3);
    ctx.fillRect(48 + i * 3, 50, 2, 3);
  }

  // Head
  ctx.fillStyle = '#6a3020';
  ctx.beginPath();
  ctx.ellipse(32, 22, 13, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#7a3828';
  ctx.beginPath();
  ctx.ellipse(32, 20, 10, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Horns
  ctx.fillStyle = '#1a1008';
  ctx.beginPath();
  ctx.moveTo(21, 14);
  ctx.lineTo(16, 2);
  ctx.lineTo(26, 12);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(43, 14);
  ctx.lineTo(48, 2);
  ctx.lineTo(38, 12);
  ctx.closePath();
  ctx.fill();

  // Eyes (glowing)
  ctx.fillStyle = '#300000';
  ctx.fillRect(24, 19, 6, 4);
  ctx.fillRect(34, 19, 6, 4);
  ctx.fillStyle = '#ff3010';
  ctx.fillRect(25, 20, 4, 2);
  ctx.fillRect(35, 20, 4, 2);
  ctx.fillStyle = '#ffee60';
  ctx.fillRect(26, 20, 2, 1);
  ctx.fillRect(36, 20, 2, 1);

  // Mouth + fangs
  ctx.fillStyle = '#100000';
  ctx.fillRect(27, 27, 10, 4);
  ctx.fillStyle = '#f0e4c8';
  ctx.fillRect(28, 27, 1, 3);
  ctx.fillRect(30, 27, 1, 2);
  ctx.fillRect(33, 27, 1, 2);
  ctx.fillRect(35, 27, 1, 3);

  // Legs
  ctx.fillStyle = '#4a2010';
  ctx.fillRect(22, 54, 8, 10);
  ctx.fillRect(34, 54, 8, 10);
  ctx.fillStyle = '#2a1508';
  ctx.fillRect(20, 62, 12, 3);
  ctx.fillRect(32, 62, 12, 3);

  return {
    width: size,
    height: size,
    data: ctx.getImageData(0, 0, size, size).data,
  };
}
