import { HEIGHT, MAP, TEX_SIZE, WIDTH } from './assets';
import type { Enemy, Player, Texture } from './types';

const FLOOR_COLOR = { r: 55, g: 55, b: 60 };
const CEIL_COLOR = { r: 28, g: 28, b: 38 };

export type EngineState = {
  readonly frame: ImageData;
  readonly zBuffer: Float32Array;
};

export function createEngineState(ctx: CanvasRenderingContext2D): EngineState {
  return {
    frame: ctx.createImageData(WIDTH, HEIGHT),
    zBuffer: new Float32Array(WIDTH),
  };
}

export function isBlocked(x: number, y: number): boolean {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  if (iy < 0 || iy >= MAP.length) return true;
  const row = MAP[iy];
  if (!row || ix < 0 || ix >= row.length) return true;
  return (row[ix] ?? 1) !== 0;
}

function sampleTex(tex: Texture, tx: number, ty: number): number {
  const x = ((tx % tex.width) + tex.width) % tex.width;
  const y = ((ty % tex.height) + tex.height) % tex.height;
  return (y * tex.width + x) * 4;
}

/**
 * Fill floor and ceiling with flat gradient colors.
 * Full floorcasting is expensive for a demo; flat bands look sufficiently DOOM-ish.
 */
function drawFloorCeiling(data: Uint8ClampedArray): void {
  for (let y = 0; y < HEIGHT; y++) {
    const isCeil = y < HEIGHT / 2;
    const dist = isCeil ? HEIGHT / 2 - y : y - HEIGHT / 2;
    const shade = Math.max(0.3, 1 - dist / (HEIGHT / 1.5));
    const col = isCeil ? CEIL_COLOR : FLOOR_COLOR;
    const r = col.r * shade;
    const g = col.g * shade;
    const b = col.b * shade;
    for (let x = 0; x < WIDTH; x++) {
      const idx = (y * WIDTH + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }
}

function castWalls(
  player: Player,
  textures: readonly Texture[],
  state: EngineState
): void {
  const data = state.frame.data;
  const z = state.zBuffer;

  for (let x = 0; x < WIDTH; x++) {
    const cameraX = (2 * x) / WIDTH - 1;
    const rayDirX = player.dirX + player.planeX * cameraX;
    const rayDirY = player.dirY + player.planeY * cameraX;

    let mapX = Math.floor(player.x);
    let mapY = Math.floor(player.y);

    const deltaDistX = rayDirX === 0 ? 1e30 : Math.abs(1 / rayDirX);
    const deltaDistY = rayDirY === 0 ? 1e30 : Math.abs(1 / rayDirY);

    let stepX: number;
    let stepY: number;
    let sideDistX: number;
    let sideDistY: number;

    if (rayDirX < 0) {
      stepX = -1;
      sideDistX = (player.x - mapX) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (mapX + 1 - player.x) * deltaDistX;
    }
    if (rayDirY < 0) {
      stepY = -1;
      sideDistY = (player.y - mapY) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1 - player.y) * deltaDistY;
    }

    let hit = 0;
    let side = 0;
    let wallType = 0;
    let iterations = 0;
    while (hit === 0 && iterations < 64) {
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        mapX += stepX;
        side = 0;
      } else {
        sideDistY += deltaDistY;
        mapY += stepY;
        side = 1;
      }
      const row = MAP[mapY];
      const cell = row ? row[mapX] : 1;
      if (cell !== undefined && cell > 0) {
        hit = 1;
        wallType = cell;
      }
      iterations++;
    }
    if (hit === 0) {
      z[x] = Infinity;
      continue;
    }

    const perpDist =
      side === 0 ? sideDistX - deltaDistX : sideDistY - deltaDistY;
    const safeDist = Math.max(perpDist, 0.0001);
    z[x] = safeDist;

    const lineHeight = Math.floor(HEIGHT / safeDist);
    let drawStart = Math.floor(-lineHeight / 2 + HEIGHT / 2);
    if (drawStart < 0) drawStart = 0;
    let drawEnd = Math.floor(lineHeight / 2 + HEIGHT / 2);
    if (drawEnd >= HEIGHT) drawEnd = HEIGHT - 1;

    const texIndex = Math.min(wallType - 1, textures.length - 1);
    const tex = textures[texIndex];
    if (!tex) continue;

    let wallX =
      side === 0
        ? player.y + safeDist * rayDirY
        : player.x + safeDist * rayDirX;
    wallX -= Math.floor(wallX);

    let texX = Math.floor(wallX * tex.width);
    if (side === 0 && rayDirX > 0) texX = tex.width - texX - 1;
    if (side === 1 && rayDirY < 0) texX = tex.width - texX - 1;
    texX = Math.max(0, Math.min(tex.width - 1, texX));

    const step = tex.height / lineHeight;
    let texPos = (drawStart - HEIGHT / 2 + lineHeight / 2) * step;

    const shade = Math.max(0.25, Math.min(1, 1 - safeDist / 14));
    const sideShade = side === 1 ? 0.72 : 1;
    const finalShade = shade * sideShade;

    for (let y = drawStart; y <= drawEnd; y++) {
      const texY = Math.min(tex.height - 1, Math.max(0, Math.floor(texPos)));
      texPos += step;
      const idx = sampleTex(tex, texX, texY);
      const r = tex.data[idx] ?? 0;
      const g = tex.data[idx + 1] ?? 0;
      const b = tex.data[idx + 2] ?? 0;
      const o = (y * WIDTH + x) * 4;
      data[o] = r * finalShade;
      data[o + 1] = g * finalShade;
      data[o + 2] = b * finalShade;
      data[o + 3] = 255;
    }
  }
}

function drawSprites(
  player: Player,
  enemies: readonly Enemy[],
  aliveSprite: Texture,
  deadSprite: Texture,
  state: EngineState
): void {
  // Order by distance, far to near
  const order = enemies
    .map((e, i) => ({ i, d: (player.x - e.x) ** 2 + (player.y - e.y) ** 2 }))
    .sort((a, b) => b.d - a.d);

  const invDet =
    1 / (player.planeX * player.dirY - player.dirX * player.planeY);

  const data = state.frame.data;
  const z = state.zBuffer;

  for (const { i } of order) {
    const enemy = enemies[i];
    if (!enemy) continue;
    const sprite = enemy.alive ? aliveSprite : deadSprite;

    const spriteX = enemy.x - player.x;
    const spriteY = enemy.y - player.y;

    const transformX = invDet * (player.dirY * spriteX - player.dirX * spriteY);
    const transformY = invDet * (-player.planeY * spriteX + player.planeX * spriteY);
    if (transformY <= 0.05) continue;

    const screenX = Math.floor((WIDTH / 2) * (1 + transformX / transformY));

    const yOffsetWorld = enemy.alive ? 0 : 0.35;
    const vMove = (yOffsetWorld * HEIGHT) / transformY;

    const spriteHeight = Math.abs(Math.floor(HEIGHT / transformY));
    let drawStartY = Math.floor(-spriteHeight / 2 + HEIGHT / 2 + vMove);
    if (drawStartY < 0) drawStartY = 0;
    let drawEndY = Math.floor(spriteHeight / 2 + HEIGHT / 2 + vMove);
    if (drawEndY >= HEIGHT) drawEndY = HEIGHT - 1;

    const spriteWidth = Math.abs(Math.floor(HEIGHT / transformY));
    let drawStartX = Math.floor(-spriteWidth / 2 + screenX);
    if (drawStartX < 0) drawStartX = 0;
    let drawEndX = Math.floor(spriteWidth / 2 + screenX);
    if (drawEndX >= WIDTH) drawEndX = WIDTH - 1;

    const shade = Math.max(0.35, Math.min(1, 1 - transformY / 14));
    const flashR = enemy.hitFlash > 0 ? 220 : 0;

    for (let stripe = drawStartX; stripe <= drawEndX; stripe++) {
      if (transformY >= (z[stripe] ?? Infinity)) continue;
      const texX = Math.floor(
        ((stripe - (-spriteWidth / 2 + screenX)) * TEX_SIZE) / spriteWidth
      );
      if (texX < 0 || texX >= sprite.width) continue;
      for (let y = drawStartY; y <= drawEndY; y++) {
        const d = (y - vMove) * 256 - HEIGHT * 128 + spriteHeight * 128;
        const texY = Math.floor((d * TEX_SIZE) / spriteHeight / 256);
        if (texY < 0 || texY >= sprite.height) continue;
        const sIdx = (texY * sprite.width + texX) * 4;
        const alpha = sprite.data[sIdx + 3] ?? 0;
        if (alpha < 128) continue;
        const r = (sprite.data[sIdx] ?? 0) * shade + flashR;
        const g = (sprite.data[sIdx + 1] ?? 0) * shade;
        const b = (sprite.data[sIdx + 2] ?? 0) * shade;
        const o = (y * WIDTH + stripe) * 4;
        data[o] = Math.min(255, r);
        data[o + 1] = g;
        data[o + 2] = b;
        data[o + 3] = 255;
      }
    }
  }
}

export function renderFrame(
  ctx: CanvasRenderingContext2D,
  state: EngineState,
  player: Player,
  enemies: readonly Enemy[],
  textures: readonly Texture[],
  aliveSprite: Texture,
  deadSprite: Texture
): void {
  drawFloorCeiling(state.frame.data);
  castWalls(player, textures, state);
  drawSprites(player, enemies, aliveSprite, deadSprite, state);
  ctx.putImageData(state.frame, 0, 0);
}
