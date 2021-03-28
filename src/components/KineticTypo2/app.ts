import * as PIXI from 'pixi.js';
import Visual from './visual';
import { getKeyboardAlphabet } from '../../utils';
import type { Renderer, Container } from 'pixi.js';

export default class App extends HTMLElement {
  private canvas: HTMLCanvasElement;
  private visual: Visual | undefined;
  private renderer: Renderer | undefined;
  private stage: Container | undefined;
  private stageWidth: number = 0;
  private stageHeight: number = 0;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.canvas = document.createElement('canvas');
    this.setWebgl();

    shadowRoot.appendChild(this.canvas);

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

        requestAnimationFrame(this.customAnimate.bind(this));
      },
    });
  }

  setWebgl() {
    this.renderer = new PIXI.Renderer({
      view: this.canvas,
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      antialias: true,
      backgroundAlpha: 1,
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

  customAnimate(t: number) {
    requestAnimationFrame(this.customAnimate.bind(this));

    if (this.visual === undefined) return;
    this.visual.animate();

    if (this.renderer === undefined) return;
    if (this.stage === undefined) return;
    this.renderer.render(this.stage);
  }
}

customElements.define('kinetic-typo-element2', App);
