import Visual from './visual';

export default class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  pixelRatio: number;
  visual: Visual | undefined;
  stageWidth: number = 0;
  stageHeight: number = 0;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'typo4';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    WebFont.load({
      google: {
        families: ['Hind:700'],
      },
      fontactive: () => {
        this.visual = new Visual();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
      },
    });
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    if (this.ctx === null) return;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.ctx.globalCompositeOperation = 'lighter';

    if (this.visual === undefined) return;
    this.visual.show(this.stageWidth, this.stageHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    if (this.ctx === null) return;
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    if (this.visual === undefined) return;
    this.visual.animate(this.ctx);
  }
}
