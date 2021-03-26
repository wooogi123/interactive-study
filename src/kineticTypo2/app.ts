import * as PIXI from 'pixi.js';
import Visual from './visual';
import { getKeyboardAlphabet } from '../utils';
import type { Renderer, Container } from 'pixi.js';

export default class App {
  private canvas: HTMLCanvasElement;
  private visual: Visual | undefined;
  private renderer: Renderer | undefined;
  private stage: Container | undefined;
  private stageWidth: number = 0;
  private stageHeight: number = 0;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'typo2';
    document.body.appendChild(this.canvas);
    this.setWebgl();

    WebFont.load({
      google: {
        families: ['Hind:700'],
      },
      fontactive: () => {
        this.visual = new Visual();

        document.addEventListener('keydown', (e) => {
          if (getKeyboardAlphabet(e.code)
            && this.stage !== undefined) {
            this.visual?.show(
              this.stageWidth,
              this.stageHeight,
              this.stage,
              e.key.toUpperCase(),
            );
          }
        }, false);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
      },
    });
  }

  setWebgl() {
    this.renderer = new PIXI.Renderer({
      view: this.canvas,
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      antialias: true,
      transparent: false,
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

    if (this.visual === undefined) return;
    if (this.stage === undefined) return;
    this.visual.show(this.stageWidth, this.stageHeight, this.stage);
  }

  animate(t: number) {
    requestAnimationFrame(this.animate.bind(this));

    if (this.visual === undefined) return;
    this.visual.animate();

    if (this.renderer === undefined) return;
    if (this.stage === undefined) return;
    this.renderer.render(this.stage);
  }
}
