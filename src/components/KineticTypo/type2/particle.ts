import * as PIXI from 'pixi.js';
import type {
  Sprite,
  Texture,
  Resource,
} from 'pixi.js';

interface Pos {
  x: number;
  y: number;
}

const FRICTION: number = 0.98;
const COLOR_SPEED: number = 0.12;
const MOVE_SPEED: number = 0.88;

export default class Particle {
  private savedX: number;
  private savedY: number;

  sprite: Sprite;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  savedRgb: number;
  rgb: number;

  constructor(pos: Pos, texture: Texture<Resource> | undefined) {
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.scale.set(0.06);

    this.savedX = pos.x;
    this.savedY = pos.y;

    this.x = pos.x;
    this.y = pos.y;

    this.sprite.x = this.x;
    this.sprite.y = this.y;

    this.vx = 0;
    this.vy = 0;
    this.radius = 10;

    this.savedRgb = 0xf3316e;
    this.rgb = 0xf3316e;
  }

  collide() {
    this.rgb = 0x451966;
  }

  draw() {
    this.rgb += (this.savedRgb - this.rgb) * COLOR_SPEED;

    this.x += (this.savedX - this.x) * MOVE_SPEED;
    this.y += (this.savedY - this.y) * MOVE_SPEED;

    this.vx *= FRICTION;
    this.vy *= FRICTION;

    this.x += this.vx;
    this.y += this.vy;

    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.tint = this.rgb;
  }
}
