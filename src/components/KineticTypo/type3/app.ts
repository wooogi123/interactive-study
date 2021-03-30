import Visual from './visual';

export default class App {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private pixelRatio: number;
  private visual: Visual | undefined;
  private stageWidth: number = 0;
  private stageHeight: number = 0;

  constructor(canvas: HTMLCanvasElement, root: ShadowRoot) {
    const style = document.createElement('style');
    style.innerHTML = `
      canvas {
        width: 100%;
        height: 100%;
      }
    `;
    root.insertBefore(style, canvas);

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.visual = new Visual();

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    if (this.ctx === null) return;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    if (this.visual === undefined) return;
    this.visual.show(this.stageWidth, this.stageHeight);
  }

  animate(t: number) {
    requestAnimationFrame(this.animate.bind(this));

    if (this.ctx === null) return;
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    if (this.visual === undefined) return;
    this.visual.animate(this.ctx, t);
  }
}
