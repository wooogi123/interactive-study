import * as PIXI from 'pixi.js';
import Visual from './visual';
import type { Renderer, Container } from 'pixi.js';

export default class App {
  private visual: Visual;
  private stageWidth: number = 0;
  private stageHeight: number = 0;
  private renderer: Renderer | undefined;
  private stage: Container | undefined;

  constructor(canvas: HTMLCanvasElement) {
    this.setWebgl(canvas);

    this.visual = new Visual();

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  setWebgl(canvas: HTMLCanvasElement) {
    this.renderer = new PIXI.Renderer({
      view: canvas,
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      antialias: true,
      backgroundAlpha: 1.0,
      resolution: (window.devicePixelRatio > 1) ? 2 : 1,
      autoDensity: true,
      powerPreference: 'high-performance',
      backgroundColor: 0xffffff,
    });

    this.stage = new PIXI.Container();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    if (this.renderer === undefined) return;
    this.renderer.resize(this.stageWidth, this.stageHeight);

    if (this.stage === undefined) return;
    this.visual.show(this.stageWidth, this.stageHeight, this.stage);
  }

  animate(t: number) {
    requestAnimationFrame(this.animate.bind(this));

    this.visual.animate();

    if (this.renderer === undefined) return;
    if (this.stage === undefined) return;
    this.renderer.render(this.stage);
  }
}
