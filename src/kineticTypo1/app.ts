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
    this.canvas.id = 'typo1';
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
      backgroundColor: 0x7f00ff,
    });

    this.stage = new PIXI.Container();

    const blurFilter = new PIXI.filters.BlurFilter();
    blurFilter.blur = 10;
    blurFilter.autoFit = true;

    const fragSource = `
      precision mediump float;
      varying vec2 vTextureCoord;
      uniform sampler2D uSampler;
      uniform float threshold;
      uniform float mr;
      uniform float mg;
      uniform float mb;

      void main(void) {
        vec4 color = texture2D(uSampler, vTextureCoord);
        vec3 mcolor = vec3(mr, mg, mb);
        if (color.a > threshold) {
          gl_FragColor = vec4(mcolor, 1.0);
        } else {
          gl_FragColor = vec4(vec3(0.0), 0.0);
        }
      }
    `;

    const uniformsData = {
      threshold: 0.5,
      mr: 235.0 / 255.0,
      mg: 235.0 / 255.0,
      mb: 235.0 / 255.0,
    };

    const thresholdFilter = new PIXI.Filter(undefined, fragSource, uniformsData);
    this.stage.filters = [blurFilter, thresholdFilter];
    this.stage.filterArea = this.renderer.screen;
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
