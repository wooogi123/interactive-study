import Visual from './visual';

export default class App extends HTMLElement {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private pixelRatio: number;
  private visual: Visual | undefined;
  private stageWidth: number = 0;
  private stageHeight: number = 0;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    shadowRoot.appendChild(this.canvas);

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

    this.canvas.style.width = `${this.stageWidth}px`;
    this.canvas.style.height = `${this.stageHeight}px`;

    if (this.ctx === null) return;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 4;

    if (this.visual === undefined) return;
    this.visual.show(this.stageWidth, this.stageHeight);
  }

  customAnimate(t: number) {
    requestAnimationFrame(this.customAnimate.bind(this));

    if (this.ctx === null) return;
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    if (this.visual === undefined) return;
    this.visual.animate(this.ctx);
  }
}

customElements.define('kinetic-typo-element7', App);
