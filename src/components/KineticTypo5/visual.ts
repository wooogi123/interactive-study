import Particle from './particle';

const TOTAL = 6;

interface Pos {
  x: number;
  y: number;
}

export default class Visual {
  pos: Pos[];
  colorCtx: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(
    pos: Pos[],
    colorCtx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) {
    this.pos = pos;
    this.colorCtx = colorCtx;
    this.width = width;
    this.height = height;
  }

  animate(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < TOTAL; i++) {
      const myPos = this.pos[Math.round(Math.random() * (this.pos.length - 1))];
      new Particle(myPos, this.getColor(), ctx);
    }
  }

  getColor() {
    const x = Math.round(Math.random() * (this.width - 1));
    const y = Math.round(Math.random() * (this.height - 1));
    const data = this.colorCtx.getImageData(x, y, 4, 4).data;
    return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
  }
}
