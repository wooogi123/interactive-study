import * as PIXI from 'pixi.js';
import Text from './text';
import Particle from './particle';
// @ts-ignore
import ParticleRaw from '../../assets/particle.png';
import type {
  Texture,
  Container,
  ParticleContainer,
} from 'pixi.js';

interface Pos {
  x: number;
  y: number;
}

interface Mouse extends Pos {
  radius: number;
}

export default class Visual {
  private text: Text;
  private texture: Texture;
  private particles: Particle[];
  private mouse: Mouse;
  private container: ParticleContainer | undefined;
  private pos: Pos[] | undefined;

  constructor() {
    this.text = new Text();

    this.texture = PIXI.Texture.from(ParticleRaw);

    this.particles = [];

    this.mouse = {
      x: 0,
      y: 0,
      radius: 50,
    }

    document.addEventListener('pointermove', this.onMove.bind(this), false);
  }

  show(
    stageWidth: number,
    stageHeight: number,
    stage: Container,
    srcText: string | undefined = 'A',
  ) {
    if (this.container) {
      stage.removeChild(this.container);
    }

    this.pos = this.text.setText(srcText, 2, stageWidth, stageHeight);
    if (this.pos === undefined) return;

    this.container = new PIXI.ParticleContainer(
      this.pos.length,
      {
        vertices: false,
        position: true,
        rotation: false,
        scale: false,
        uvs: false,
        tint: false,
      },
    );
    stage.addChild(this.container);

    for (let i = 0; i < this.pos.length; i++) {
      const item = new Particle(this.pos[i], this.texture);
      this.container.addChild(item.sprite);
      this.particles.push(item);
    }
  }

  animate() {
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
        item.vy -= ax;
        item.vx -= ay;
      }

      item.draw();
    }
  }

  onMove(e: PointerEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}
