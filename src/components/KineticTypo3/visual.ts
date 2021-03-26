import Text from './text';
import Particle from './particle';

export const RANDOM_TEXT: string = 'ABCMNRSTUXZ';

interface Pos {
  x: number;
  y: number;
}

interface Mouse extends Pos {
  radius: number;
}

export default class Visual {
  private text: Text;
  private particles: Particle[];
  private mouse: Mouse;
  private pos: Pos[] | undefined;

  textArr: string[];

  constructor() {
    this.text = new Text();

    this.textArr = RANDOM_TEXT.split('');

    this.particles = [];

    this.mouse = {
      x: 0,
      y: 0,
      radius: 50,
    };

    document.addEventListener('pointermove', this.onMove.bind(this), false);
  }

  show(
    stageWidth: number,
    stageHeight: number,
  ) {
    const str = this.textArr[Math.round(Math.random() * (this.textArr.length - 1))];

    this.pos = this.text.setText(str, 26, stageWidth, stageHeight);
    if (this.pos === undefined) return;

    this.particles = [];

    for (let i = 0; i < this.pos.length; i++) {
      const item = new Particle(this.pos[i]);
      this.particles.push(item);
    }
  }

  animate(ctx: CanvasRenderingContext2D, t: number) {
    for (let i = 0; i < this.particles.length; i++) {
      const item = this.particles[i];

      const dx = this.mouse.x - item.x;
      const dy = this.mouse.y - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = item.radius + this.mouse.radius;

      if (dist < minDist) {
        const angle = Math.atan2(dy, dx);
        const tx = item.x + Math.cos(angle) * minDist;
        const ty = item.y + Math.sin(angle) * minDist;
        const ax = tx - this.mouse.x;
        const ay = ty - this.mouse.y;
        item.vx -= ax;
        item.vy -= ay;
        item.collide();
      }

      item.draw(ctx, t);
    }
  }

  onMove(e: PointerEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}