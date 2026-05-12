export type Texture = {
  readonly width: number;
  readonly height: number;
  readonly data: Uint8ClampedArray;
};

export type Player = {
  x: number;
  y: number;
  dirX: number;
  dirY: number;
  planeX: number;
  planeY: number;
  health: number;
  ammo: number;
  kills: number;
  bobPhase: number;
  iframes: number;
};

export type Enemy = {
  id: number;
  x: number;
  y: number;
  alive: boolean;
  health: number;
  hitFlash: number;
  deathAt: number;
  attackCooldown: number;
};

export type GameState = {
  player: Player;
  enemies: Enemy[];
  muzzleFlash: number;
  hurtFlash: number;
  lastFireTime: number;
  status: 'playing' | 'won' | 'lost';
  startTime: number;
};

export type Keys = Set<string>;

export type WallMap = readonly (readonly number[])[];
