'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DAMAGE_PER_SHOT,
  ENEMY_ATTACK_COOLDOWN,
  ENEMY_ATTACK_RANGE,
  ENEMY_DAMAGE,
  ENEMY_HEALTH,
  ENEMY_SPAWNS,
  ENEMY_SPEED,
  FIRE_COOLDOWN_MS,
  HEIGHT,
  MAP,
  MAX_AMMO,
  MAX_HEALTH,
  MOUSE_SENS,
  MOVE_SPEED,
  ROT_SPEED,
  WIDTH,
  createImpSprite,
  createTextures,
} from './assets';
import { AudioEngine } from './audio';
import { createEngineState, isBlocked, renderFrame } from './engine';
import type { Enemy, GameState, Keys, Player } from './types';

const initialPlayer = (): Player => ({
  x: 2.5,
  y: 2.5,
  dirX: 1,
  dirY: 0,
  planeX: 0,
  planeY: 0.66,
  health: MAX_HEALTH,
  ammo: MAX_AMMO,
  kills: 0,
  bobPhase: 0,
});

const initialEnemies = (): Enemy[] =>
  ENEMY_SPAWNS.map((s, i) => ({
    id: i,
    x: s.x,
    y: s.y,
    alive: true,
    health: ENEMY_HEALTH,
    hitFlash: 0,
    deathAt: 0,
  }));

const initialState = (): GameState => ({
  player: initialPlayer(),
  enemies: initialEnemies(),
  muzzleFlash: 0,
  hurtFlash: 0,
  hurtCooldown: 0,
  lastFireTime: 0,
  status: 'playing',
  startTime: performance.now(),
});

function tryMove(player: Player, nx: number, ny: number): void {
  const pad = 0.2;
  if (!isBlocked(nx + Math.sign(nx - player.x) * pad, player.y)) {
    player.x = nx;
  }
  if (!isBlocked(player.x, ny + Math.sign(ny - player.y) * pad)) {
    player.y = ny;
  }
}

function rotate(player: Player, angle: number): void {
  const { dirX, dirY, planeX, planeY } = player;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  player.dirX = dirX * cos - dirY * sin;
  player.dirY = dirX * sin + dirY * cos;
  player.planeX = planeX * cos - planeY * sin;
  player.planeY = planeX * sin + planeY * cos;
}

type HudSnapshot = {
  health: number;
  ammo: number;
  kills: number;
  totalEnemies: number;
  status: GameState['status'];
};

export function DoomGame(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(initialState());
  const keysRef = useRef<Keys>(new Set());
  const firingRef = useRef(false);
  const pointerLockedRef = useRef(false);
  const enemyCooldownRef = useRef<Map<number, number>>(new Map());
  const audioRef = useRef<AudioEngine>(new AudioEngine());

  const [hud, setHud] = useState<HudSnapshot>({
    health: MAX_HEALTH,
    ammo: MAX_AMMO,
    kills: 0,
    totalEnemies: ENEMY_SPAWNS.length,
    status: 'playing',
  });
  const [pointerLocked, setPointerLocked] = useState(false);

  const restart = useCallback((): void => {
    stateRef.current = initialState();
    enemyCooldownRef.current.clear();
    setHud({
      health: MAX_HEALTH,
      ammo: MAX_AMMO,
      kills: 0,
      totalEnemies: ENEMY_SPAWNS.length,
      status: 'playing',
    });
  }, []);

  const fire = useCallback((): void => {
    const s = stateRef.current;
    const audio = audioRef.current;
    if (s.status !== 'playing') return;
    const now = performance.now();
    if (now - s.lastFireTime < FIRE_COOLDOWN_MS) return;
    if (s.player.ammo <= 0) {
      audio.emptyClick();
      s.lastFireTime = now;
      return;
    }
    s.lastFireTime = now;
    s.player.ammo -= 1;
    s.muzzleFlash = 1;
    audio.gunshot();

    // Hitscan: find the closest enemy within a tight cone in front
    let best: Enemy | null = null;
    let bestDist = Infinity;
    const cosMin = Math.cos(0.1);
    for (const enemy of s.enemies) {
      if (!enemy.alive) continue;
      const dx = enemy.x - s.player.x;
      const dy = enemy.y - s.player.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 0.01) continue;
      const dot = (dx * s.player.dirX + dy * s.player.dirY) / dist;
      if (dot < cosMin) continue;
      if (dist < bestDist) {
        best = enemy;
        bestDist = dist;
      }
    }
    if (best) {
      // Wall check: is there a clear line of sight?
      const steps = Math.ceil(bestDist * 8);
      const sx = (best.x - s.player.x) / steps;
      const sy = (best.y - s.player.y) / steps;
      let blocked = false;
      for (let i = 1; i < steps; i++) {
        if (isBlocked(s.player.x + sx * i, s.player.y + sy * i)) {
          blocked = true;
          break;
        }
      }
      if (!blocked) {
        best.health -= DAMAGE_PER_SHOT;
        best.hitFlash = 0.18;
        audio.enemyHit();
        if (best.health <= 0) {
          best.alive = false;
          best.deathAt = performance.now();
          s.player.kills += 1;
          audio.enemyDeath();
        }
      }
    }
  }, []);

  // Lock pointer when user clicks the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onClick = (): void => {
      audioRef.current.init();
      audioRef.current.resume();
      canvas.requestPointerLock?.();
    };
    canvas.addEventListener('click', onClick);
    return () => canvas.removeEventListener('click', onClick);
  }, []);

  // Pointer lock state + mouse look
  useEffect(() => {
    const onLockChange = (): void => {
      const locked = document.pointerLockElement === canvasRef.current;
      pointerLockedRef.current = locked;
      setPointerLocked(locked);
    };
    const onMouseMove = (e: MouseEvent): void => {
      if (!pointerLockedRef.current) return;
      rotate(stateRef.current.player, -e.movementX * MOUSE_SENS);
    };
    const onMouseDown = (e: MouseEvent): void => {
      if (!pointerLockedRef.current) return;
      if (e.button === 0) {
        firingRef.current = true;
        fire();
      }
    };
    const onMouseUp = (): void => {
      firingRef.current = false;
    };
    document.addEventListener('pointerlockchange', onLockChange);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('pointerlockchange', onLockChange);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [fire]);

  // Keyboard
  useEffect(() => {
    const onDown = (e: KeyboardEvent): void => {
      const k = e.key.toLowerCase();
      keysRef.current.add(k);
      if (k === ' ' || k === 'enter') {
        if (stateRef.current.status !== 'playing') {
          restart();
        } else {
          fire();
        }
        e.preventDefault();
      }
      if (k === 'r' && stateRef.current.status !== 'playing') restart();
    };
    const onUp = (e: KeyboardEvent): void => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [fire, restart]);

  // Main loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;
    const ctx = canvas.getContext('2d');
    const octx = overlay.getContext('2d');
    if (!ctx || !octx) return;
    ctx.imageSmoothingEnabled = false;
    octx.imageSmoothingEnabled = false;

    const textures = createTextures();
    const alive = createImpSprite('alive');
    const dead = createImpSprite('dead');
    const engineState = createEngineState(ctx);

    let last = performance.now();
    let raf = 0;

    const loop = (now: number): void => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const s = stateRef.current;
      const keys = keysRef.current;
      const audio = audioRef.current;

      if (s.status === 'playing') {
        let moveX = 0;
        let moveY = 0;
        if (keys.has('w') || keys.has('arrowup')) {
          moveX += s.player.dirX;
          moveY += s.player.dirY;
        }
        if (keys.has('s') || keys.has('arrowdown')) {
          moveX -= s.player.dirX;
          moveY -= s.player.dirY;
        }
        if (keys.has('a')) {
          moveX += s.player.dirY;
          moveY -= s.player.dirX;
        }
        if (keys.has('d')) {
          moveX -= s.player.dirY;
          moveY += s.player.dirX;
        }
        const mag = Math.hypot(moveX, moveY);
        if (mag > 0) {
          const speed = MOVE_SPEED * dt;
          moveX = (moveX / mag) * speed;
          moveY = (moveY / mag) * speed;
          tryMove(s.player, s.player.x + moveX, s.player.y + moveY);
          s.player.bobPhase += dt * 9;
        } else {
          s.player.bobPhase *= 0.92;
        }
        if (keys.has('arrowleft')) rotate(s.player, ROT_SPEED * dt);
        if (keys.has('arrowright')) rotate(s.player, -ROT_SPEED * dt);

        // Enemies
        s.hurtCooldown = Math.max(0, s.hurtCooldown - dt);
        for (const enemy of s.enemies) {
          enemy.hitFlash = Math.max(0, enemy.hitFlash - dt);
          if (!enemy.alive) continue;
          const dx = s.player.x - enemy.x;
          const dy = s.player.y - enemy.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 10 || dist < 0.001) continue;

          const nx = dx / dist;
          const ny = dy / dist;

          if (dist > ENEMY_ATTACK_RANGE) {
            const step = ENEMY_SPEED * dt;
            const tx = enemy.x + nx * step;
            const ty = enemy.y + ny * step;
            if (!isBlocked(tx, enemy.y)) enemy.x = tx;
            if (!isBlocked(enemy.x, ty)) enemy.y = ty;
          } else {
            // Attack
            const cd = enemyCooldownRef.current.get(enemy.id) ?? 0;
            const next = cd - dt;
            if (next <= 0) {
              s.player.health -= ENEMY_DAMAGE;
              s.hurtFlash = 1;
              audio.hurt();
              enemyCooldownRef.current.set(enemy.id, ENEMY_ATTACK_COOLDOWN);
              if (s.player.health <= 0) {
                s.player.health = 0;
                s.status = 'lost';
              }
            } else {
              enemyCooldownRef.current.set(enemy.id, next);
            }
          }
        }

        if (s.enemies.every((e) => !e.alive)) {
          s.status = 'won';
        }

        s.muzzleFlash = Math.max(0, s.muzzleFlash - dt * 4);
        s.hurtFlash = Math.max(0, s.hurtFlash - dt * 2);

        if (firingRef.current) fire();
      }

      // Render
      renderFrame(ctx, engineState, s.player, s.enemies, textures, alive, dead);
      drawOverlay(octx, s);

      // Sync HUD (throttle via react state)
      setHud((prev) => {
        const next: HudSnapshot = {
          health: Math.round(s.player.health),
          ammo: s.player.ammo,
          kills: s.player.kills,
          totalEnemies: s.enemies.length,
          status: s.status,
        };
        if (
          prev.health === next.health &&
          prev.ammo === next.ammo &&
          prev.kills === next.kills &&
          prev.status === next.status
        ) {
          return prev;
        }
        return next;
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [fire]);

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="absolute inset-0 h-full w-full cursor-crosshair [image-rendering:pixelated]"
          aria-label="DOOM game viewport"
        />
        <canvas
          ref={overlayRef}
          width={WIDTH}
          height={HEIGHT}
          className="pointer-events-none absolute inset-0 h-full w-full [image-rendering:pixelated]"
          aria-hidden
        />

        {!pointerLocked && hud.status === 'playing' && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/60 text-center">
            <div className="pointer-events-auto flex flex-col items-center gap-3 px-6">
              <h2 className="font-display text-4xl font-bold text-red-500">
                CLICK TO PLAY
              </h2>
              <p className="max-w-md text-sm text-white/80">
                <kbd className="rounded bg-white/10 px-1.5 py-0.5">WASD</kbd> move ·{' '}
                <kbd className="rounded bg-white/10 px-1.5 py-0.5">Mouse</kbd> look ·{' '}
                <kbd className="rounded bg-white/10 px-1.5 py-0.5">LMB / Space</kbd> fire
              </p>
              <p className="text-xs text-white/50">Esc releases pointer lock</p>
            </div>
          </div>
        )}

        {hud.status === 'won' && (
          <EndScreen
            title="YOU WIN"
            subtitle={`${hud.kills} kills. All demons eradicated.`}
            onRestart={restart}
          />
        )}
        {hud.status === 'lost' && (
          <EndScreen
            title="YOU DIED"
            subtitle={`${hud.kills} of ${hud.totalEnemies} demons down.`}
            onRestart={restart}
            danger
          />
        )}
      </div>

      <Hud hud={hud} onRestart={restart} />
    </div>
  );
}

function drawOverlay(ctx: CanvasRenderingContext2D, s: GameState): void {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Damage flash
  if (s.hurtFlash > 0) {
    ctx.fillStyle = `rgba(200, 0, 0, ${Math.min(0.55, s.hurtFlash * 0.6)})`;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }

  // Vignette-ish darken at edges
  const gradient = ctx.createRadialGradient(
    WIDTH / 2,
    HEIGHT / 2,
    HEIGHT * 0.3,
    WIDTH / 2,
    HEIGHT / 2,
    HEIGHT * 0.75
  );
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Weapon
  drawWeapon(ctx, s);
  drawCrosshair(ctx);
  drawMinimap(ctx, s);
}

function drawWeapon(ctx: CanvasRenderingContext2D, s: GameState): void {
  const bob = Math.sin(s.player.bobPhase) * 4;
  const bobV = Math.abs(Math.cos(s.player.bobPhase)) * 3;
  const kick = s.muzzleFlash * 10;
  const baseX = WIDTH / 2 - 48;
  const baseY = HEIGHT - 90 + bobV + kick;

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(baseX + 4 + bob, baseY + 4, 96, 80);

  // Barrel
  ctx.fillStyle = '#2a2a2a';
  ctx.fillRect(baseX + 30 + bob, baseY - 10, 36, 20);
  ctx.fillStyle = '#404040';
  ctx.fillRect(baseX + 34 + bob, baseY - 8, 28, 4);

  // Body
  ctx.fillStyle = '#5a3a20';
  ctx.fillRect(baseX + 10 + bob, baseY + 10, 76, 36);
  ctx.fillStyle = '#7a5030';
  ctx.fillRect(baseX + 14 + bob, baseY + 14, 68, 8);

  // Pump
  ctx.fillStyle = '#303030';
  ctx.fillRect(baseX + 20 + bob, baseY + 28, 52, 12);
  ctx.fillStyle = '#1a1a1a';
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(baseX + 24 + i * 10 + bob, baseY + 30, 6, 8);
  }

  // Stock
  ctx.fillStyle = '#3a2818';
  ctx.fillRect(baseX + 70 + bob, baseY + 40, 26, 24);

  // Muzzle flash
  if (s.muzzleFlash > 0) {
    const f = s.muzzleFlash;
    ctx.fillStyle = `rgba(255,220,80,${f})`;
    ctx.beginPath();
    ctx.arc(baseX + 48 + bob, baseY, 26 * f, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(255,120,40,${f * 0.8})`;
    ctx.beginPath();
    ctx.arc(baseX + 48 + bob, baseY, 40 * f, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawCrosshair(ctx: CanvasRenderingContext2D): void {
  ctx.strokeStyle = 'rgba(255,255,255,0.65)';
  ctx.lineWidth = 1;
  const cx = WIDTH / 2;
  const cy = HEIGHT / 2;
  ctx.beginPath();
  ctx.moveTo(cx - 6, cy);
  ctx.lineTo(cx - 2, cy);
  ctx.moveTo(cx + 2, cy);
  ctx.lineTo(cx + 6, cy);
  ctx.moveTo(cx, cy - 6);
  ctx.lineTo(cx, cy - 2);
  ctx.moveTo(cx, cy + 2);
  ctx.lineTo(cx, cy + 6);
  ctx.stroke();
}

function drawMinimap(ctx: CanvasRenderingContext2D, s: GameState): void {
  const cell = 5;
  const mapW = MAP[0]?.length ?? 0;
  const mapH = MAP.length;
  const pad = 6;
  const x0 = WIDTH - mapW * cell - pad;
  const y0 = pad;

  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(x0 - 2, y0 - 2, mapW * cell + 4, mapH * cell + 4);

  for (let y = 0; y < mapH; y++) {
    const row = MAP[y];
    if (!row) continue;
    for (let x = 0; x < mapW; x++) {
      const v = row[x] ?? 0;
      if (v > 0) {
        ctx.fillStyle = '#6a6a78';
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
      }
      ctx.fillRect(x0 + x * cell, y0 + y * cell, cell, cell);
    }
  }

  // Enemies
  for (const e of s.enemies) {
    ctx.fillStyle = e.alive ? '#ff3020' : '#602010';
    ctx.fillRect(x0 + e.x * cell - 1, y0 + e.y * cell - 1, 2, 2);
  }

  // Player
  ctx.fillStyle = '#30ff40';
  ctx.fillRect(x0 + s.player.x * cell - 1, y0 + s.player.y * cell - 1, 2, 2);
  ctx.strokeStyle = '#30ff40';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x0 + s.player.x * cell, y0 + s.player.y * cell);
  ctx.lineTo(
    x0 + (s.player.x + s.player.dirX * 0.8) * cell,
    y0 + (s.player.y + s.player.dirY * 0.8) * cell
  );
  ctx.stroke();
}

function Hud({
  hud,
  onRestart,
}: {
  hud: HudSnapshot;
  onRestart: () => void;
}): JSX.Element {
  const healthPct = Math.max(0, Math.min(1, hud.health / MAX_HEALTH));
  return (
    <div className="mt-4 grid gap-3 rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-sm text-white shadow-xl sm:grid-cols-[1fr_1fr_1fr_auto]">
      <Stat label="HEALTH" value={`${hud.health}`} pct={healthPct} color="#ff3020" />
      <Stat label="AMMO" value={`${hud.ammo}/${MAX_AMMO}`} pct={hud.ammo / MAX_AMMO} color="#ffcc30" />
      <Stat
        label="KILLS"
        value={`${hud.kills}/${hud.totalEnemies}`}
        pct={hud.kills / Math.max(1, hud.totalEnemies)}
        color="#30ff70"
      />
      <button
        type="button"
        onClick={onRestart}
        className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-white/80 transition hover:bg-white/10"
      >
        Restart
      </button>
    </div>
  );
}

function Stat({
  label,
  value,
  pct,
  color,
}: {
  label: string;
  value: string;
  pct: number;
  color: string;
}): JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/60">
        <span>{label}</span>
        <span className="text-white">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{ width: `${Math.max(0, Math.min(1, pct)) * 100}%`, background: color }}
        />
      </div>
    </div>
  );
}

function EndScreen({
  title,
  subtitle,
  onRestart,
  danger = false,
}: {
  title: string;
  subtitle: string;
  onRestart: () => void;
  danger?: boolean;
}): JSX.Element {
  return (
    <div className="absolute inset-0 grid place-items-center bg-black/80 text-center backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 px-6">
        <h2
          className="font-display text-6xl font-bold tracking-tight"
          style={{
            color: danger ? '#ff3020' : '#30ff70',
            textShadow: `0 0 30px ${danger ? '#ff3020' : '#30ff70'}`,
          }}
        >
          {title}
        </h2>
        <p className="text-white/80">{subtitle}</p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
        >
          Play again [R]
        </button>
      </div>
    </div>
  );
}
