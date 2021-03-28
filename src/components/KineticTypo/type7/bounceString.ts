import { lineCircle } from '../utils';

const BOUNCE: number = 0.92;

interface Pos {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Point {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
}

export default class BounceString {
  points: Point[];
  detect: number;
  savedRgb: number;
  rgb: number;

  constructor(pos: Pos) {
    const middleX = (pos.x2 - pos.x1) / 2 + pos.x1;
    const middleY = (pos.y2 - pos.y1) / 2 + pos.y1;

    this.points = [
      {
        x: pos.x1,
        y: pos.y1,
        ox: pos.x1,
        oy: pos.y1,
        vx: 0,
        vy: 0,
      },
      {
        x: middleX,
        y: middleY,
        ox: middleX,
        oy: middleY,
        vx: 0,
        vy: 0,
      },
      {
        x: pos.x2,
        y: pos.y2,
        ox: pos.x2,
        oy: pos.y2,
        vx: 0,
        vy: 0,
      },
    ];

    this.detect = 10;

    this.savedRgb = 0x000000;
    this.rgb = 0x000000;
  }

  animate(
    ctx: CanvasRenderingContext2D,
    moveX: number,
    moveY: number,
  ) {
    this.rgb += (this.savedRgb - this.rgb) * 0.12;
    const red = (this.rgb >> 16) & 0xFF | 0;
    const green = (this.rgb >> 8) & 0xFF | 0;
    const blue = (this.rgb & 0xFF) | 0;
    const color = `rgb(${red}, ${green}, ${blue})`;
    ctx.strokeStyle = color;
    ctx.beginPath();
    
    if (lineCircle(
      this.points[0].x,
      this.points[0].y,
      this.points[2].x,
      this.points[2].y,
      moveX,
      moveY,
      this.detect,
    )) {
      this.rgb = 0xf3316e;
      this.detect = 100;
      let tx = moveX;
      let ty = (this.points[1].oy + moveY) / 2;
      this.points[1].vx = tx - this.points[1].x;
      this.points[1].vy = ty - this.points[1].y;
    } else {
      this.detect = 10;
      let tx = this.points[1].ox;
      let ty = this.points[1].oy;
      this.points[1].vx += tx - this.points[1].x;
      this.points[1].vx *= BOUNCE;
      this.points[1].vy += ty - this.points[1].y;
      this.points[1].vy *= BOUNCE;
    }

    this.points[1].x += this.points[1].vx;
    this.points[1].y += this.points[1].vy;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 1; i < this.points.length; i++) {
      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.stroke();
  }
}
