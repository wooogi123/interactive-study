import Text from '../text';
import BounceString from './bounceString';

interface Pos {
  x: number;
  y: number;
}

interface Mouse {
  x: number;
  y: number;
  radius: number;
}

interface Outline {
  x: number;
  minY: number;
  maxY: number;
}

interface GetOutlineReturn {
  particles: Pos[];
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  outline: Outline[];
}

export default class Visual {
  text: Text;
  strings: BounceString[];
  mouse: Mouse;
  pos: GetOutlineReturn | undefined;

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

  show(stageWidth: number, stageHeight: number, srcStr: string | undefined = 'A') {
    this.pos = this.text.setText(srcStr, 5, stageWidth, stageHeight, true);

    this.strings = [];

    if (this.pos === undefined) return;

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