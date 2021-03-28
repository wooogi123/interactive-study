import Text from './text';
import BounceString from './bounceString';

type Pos = ReturnType<Text['setText']>;

interface Mouse {
  x: number;
  y: number;
  radius: number;
}

export default class Visual {
  text: Text;
  strings: BounceString[];
  mouse: Mouse;
  pos: Pos;

  constructor() {
    this.text = new Text();

    this.strings = [];

    this.mouse = {
      x: 0,
      y: 0,
      radius: 100,
    }

    document.addEventListener('pointermove', this.onMove.bind(this), false);
  }

  show(stageWidth: number, stageHeight: number) {
    this.pos = this.text.setText('A', 5, stageWidth, stageHeight);

    this.strings = [];

    if (this.pos === undefined) return;

    console.log(this.pos.outline);
    for (let i = 0; i < this.pos.outline.length; i++) {
      this.strings[i] = new BounceString({
        x1: this.pos.outline[i].x,
        y1: this.pos.outline[i].minY,
        x2: this.pos.outline[i].x,
        y2: this.pos.outline[i].maxY,
      });
    }
  }

  animate(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.strings.length; i++) {
      this.strings[i].animate(ctx, this.mouse.x, this.mouse.y);
    }
  }

  onMove(e: PointerEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}