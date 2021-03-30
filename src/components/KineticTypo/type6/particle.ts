import * as PIXI from 'pixi.js';
import { hslToHexNumber } from '../utils';
import type { Texture, Sprite } from 'pixi.js';

interface Pos {
  x: number;
  y: number;
}

export default class Particle {
  sprite: Sprite;
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(
    pos: Pos,
    groupRatio: number,
    indexRatio: number,
    texture: Texture,
  ) {
    this.sprite = new PIXI.Sprite(texture)
    const minScale: number = 0.3;
    const maxScale: number = 0.6;
    const scale: number = (maxScale - minScale) * indexRatio + minScale;
    this.sprite.scale.set(scale);

    const minLight: number = 60;
    const maxLight: number = 40;
    const light: number = (maxLight - minLight) * indexRatio + minLight;

    const minHue: number = 280;
    const maxHue: number = 330;
    const hue: number = (maxHue - minHue) * groupRatio + minHue;

    this.sprite.tint = hslToHexNumber(hue, 84, light);

    this.x = pos.x;
    this.y = pos.y;
    this.sprite.x = this.x;
    this.sprite.y = this.y;

    this.vx = 0;
    this.vy = 0;
  }

  animate(index: number, total: number) {
    if (index < total) {
      this.x += this.vx;
      this.y += this.vy;
    }

    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
}