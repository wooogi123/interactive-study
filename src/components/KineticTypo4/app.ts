import Visual from './visual';

export default class App extends HTMLElement {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  pixelRatio: number;
  visual: Visual | undefined;
  stageWidth: number = 0;
  stageHeight: number = 0;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.innerHTML = `
      canvas {
        width: 100%;
        height: 100%;
        background-color: #000000;
      }
    `;
    shadowRoot.appendChild(style);

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    shadowRoot.appendChild(this.canvas);

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    WebFont.load({
      google: {
        families: ['Hind:700'],
      },
      fontactive: () => {
        this.visual = new Visual();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.customAnimate.bind(this));
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

  customAnimate() {
    requestAnimationFrame(this.customAnimate.bind(this));

    if (this.ctx === null) return;
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    if (this.visual === undefined) return;
    this.visual.animate(this.ctx);
  }
}

customElements.define('kinetic-typo-element4', App);
