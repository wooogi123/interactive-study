import { RANDOM_TEXT } from './visual';

interface Pos {
  x: number;
  y: number;
}

const FRICTION: number = 0.86;
const COLOR_SPEED: number = 0.12;

export default class Particle {
  private savedX: number;
  private savedY: number;

  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  textArr: string[];
  cur: number;
  total: number;
  fps: number;
  fpsTime: number;
  savedRgb: number;
  rgb: number;

  time: number = 0;

  constructor(pos: Pos) {
    this.savedX = pos.x;
    this.savedY = pos.y;

    this.x = pos.x;
    this.y = pos.y;

    this.vx = 0;
    this.vy = 0;
    this.radius = 10;

    this.textArr = RANDOM_TEXT.split('');
    this.cur = 0;
    this.total = this.textArr.length;

    this.fps = 15;
    this.fpsTime = 1000 / this.fps;

    this.savedRgb = 0x000000;
    this.rgb = 0x000000;
  }

  collide() {
    this.rgb = 0xf3316e;
    this.textArr = this.shuffle(this.textArr);
  }

  draw(ctx: CanvasRenderingContext2D, t: number) {
    this.rgb += (this.savedRgb - this.rgb) * COLOR_SPEED;

    if (!this.time) {
      this.time = t;
    }

    const now = t - this.time;
    if (now > this.fpsTime) {
      this.time = t;
      this.cur += 1;
      if (this.cur === this.total) {
        this.cur = 0;
      }
    }

    this.vx *= FRICTION;
    this.vy *= FRICTION;

    this.x += this.vx;
    this.y += this.vy;

    const red = ((this.rgb >> 16) & 0xFF) | 0;
    const green = ((this.rgb >> 8) & 0xFF) | 0;
    const blue = (this.rgb & 0xFF) | 0;
    const color = `rgb(${red}, ${green}, ${blue})`;

    const str = this.textArr[this.cur];

    ctx.beginPath();
    ctx.fillStyle = color;

    const fontWidth = 700;
    const fontSize = 14;
    const fontName = 'iA Writer Mono';
    ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    ctx.textBaseline = 'middle';
    const textPos = ctx.measureText(str);
    ctx.fillText(
      str,
      this.x - (textPos.width / 2),
      this.y + ((fontSize - textPos.actualBoundingBoxAscent)  / 2),
    );
  }

  shuffle(arr: string[]) {
    return arr.sort(() => Math.random() - 0.5);
  }
}
