const TOTAL: number = 12;

interface Pos {
  x: number;
  y: number;
}

export default class Particle {
  color: string;
  points: Pos[];

  constructor(pos: Pos, color: string, ctx: CanvasRenderingContext2D) {
    this.color = color;

    const ranMax = 20;
    this.points = [{
      x: pos.x,
      y: pos.y,
    }];

    for (let i = 1; i < TOTAL; i++) {
      const prev = this.points[i - 1];
      this.points.push(this.setRandom(prev, ranMax));
    }

    this.draw(ctx);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.lineWidth = 0.3;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length; i++) {
      const prev = this.points[i - 1];
      const cur = this.points[i];
      const cx = (prev.x + cur.x) / 2;
      const cy = (prev.y + cur.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
    }

    ctx.stroke();
  }

  setRandom(pos: Pos, gap: number) {
    return {
      x: pos.x + Math.random() * (gap + gap) - gap,
      y: pos.y + Math.random() * (gap + gap) - gap,
    };
  }
}