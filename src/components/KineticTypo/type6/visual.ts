import * as PIXI from 'pixi.js';
import Text from '../text';
import ParticleGroup from './particleGroup';
// @ts-ignore
import ParticleRaw from '../../../assets/particle.png';
import type {
  Texture,
  Container,
  ParticleContainer,
} from 'pixi.js';

const LINE_TOTAL: number = 10;

interface Pos {
  x: number;
  y: number;
}

interface Mouse extends Pos {
  radius: number;
}

export default class Visual {
  text: Text;
  texture: Texture;
  particleGroups: ParticleGroup[];
  mouse: Mouse;
  container: ParticleContainer | undefined;
  pos: Pos[] | undefined;

  constructor() {
    this.text = new Text();

    this.texture = PIXI.Texture.from(ParticleRaw);

    this.particleGroups = [];

    this.mouse = {
      x: 0,
      y: 0,
      radius: 10,
    }

    document.addEventListener('pointermove', this.onMove.bind(this), false);
  }

  show(
    stageWidth: number,
    stageHeight: number,
    stage: Container,
  ) {
    if (this.container) {
      stage.removeChild(this.container);
    }

    this.pos = this.text.setText('R', 10, stageWidth, stageHeight);

    if (this.pos === undefined) return;
    this.container = new PIXI.ParticleContainer(
      this.pos.length * LINE_TOTAL,
      {
        vertices: false,
        position: true,
        rotation: false,
        scale: false,
        uvs: false,
        tint: true,
      }
    );
    stage.addChild(this.container);

    this.particleGroups = [];
    const total = this.pos.length;
    for (let i = 0; i < total; i++) {
      const item = new ParticleGroup(this.pos[i], i / total, this.texture, LINE_TOTAL);
      this.particleGroups.push(item);
    }

    for (let i = LINE_TOTAL - 1; i >= 0; i--) {
      this.addChild(i);
    }
  }

  addChild(index: number) {
    for (let i = 0; i < this.particleGroups.length; i++) {
      this.container?.addChild(this.particleGroups[i].particles[index].sprite);
    }
  }

  animate() {
    for (let i = 0; i < this.particleGroups.length; i++) {
      const item = this.particleGroups[i];
      item.animate(this.mouse);
    }
  }

  onMove(e: PointerEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}
