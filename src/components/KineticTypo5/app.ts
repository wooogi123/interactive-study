// @ts-ignore
import Gogh1 from '../../assets/gogh1.jpg';
// @ts-ignore
import Gogh2 from '../../assets/gogh2.jpg';
// @ts-ignore
import Gogh3 from '../../assets/gogh3.jpg';
import Visual from './visual';
import { setColor } from './color';
import Text from './text';

interface Thumb {
  item: HTMLLIElement;
  img: string;
}

interface Pos {
  x: number;
  y: number;
}

export default class App extends HTMLElement {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private pixelRatio: number;
  private thumbs: Thumb[];
  private text: Text | undefined;
  private stageWidth: number = 0;
  private stageHeight: number = 0;
  private pos: Pos[] | undefined;
  private visual: Visual | undefined;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.innerHTML = `
      #kinetic-typo__wrapper {
        width: 100%;
        height: 100%;
        background-color: #000000;
      }

      canvas {
        width: 100%;
        height: 100%;
      }

      ul {
        position: absolute;
        left: 50%;
        bottom: 0;
        display: flex;
        transform: translate(-50%, 0);
      }

      ul li {
        display: inline-block;
        width: 60px;
        height: 60px;
        margin: 0 10px;
        cursor: pointer;
        box-sizing: border-box;
      }

      ul li.selected {
        border: 4px solid #ffffff;
      }

      ul li img {
        width: 100%;
        height: 100%;
      }
    `;
    shadowRoot.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'kinetic-typo__wrapper');

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.thumbs = [];

    wrapper.appendChild(this.canvas);


    WebFont.load({
      google: {
        families: ['Hind:700'],
      },
      fontactive: () => {
        const ul = document.createElement('ul');

        [Gogh1, Gogh2, Gogh3].forEach((image, i) => {
          const li = document.createElement('li');
          const img = document.createElement('img');
          img.src = image;
          img.addEventListener('click', (e) => {
            this.show(i);
          }, false)

          this.thumbs[i] = {
            item: li,
            img: img.src,
          };

          li.appendChild(img);
          ul.appendChild(li);

          wrapper.appendChild(ul);

          this.text = new Text();

          window.addEventListener('resize', this.resize.bind(this), false);
          this.resize();

          requestAnimationFrame(this.customAnimate.bind(this));
        });
      },
    });

    shadowRoot.appendChild(wrapper);
  }

  async show(index: number) {
    for (let i = 0; i < this.thumbs.length; i++) {
      const item = this.thumbs[i].item;
      if (i === index) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    }

    const img = this.thumbs[index].img;

    await setColor(img)
      .then((obj) => {
        if (this.pos === undefined) return;
        this.visual = new Visual(this.pos, obj.colorCtx, obj.width, obj.height);
      });
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx?.scale(this.pixelRatio, this.pixelRatio);

    if (this.text === undefined) return;
    this.pos = this.text.setText('M', 6, this.stageWidth, this.stageHeight);
  }

  customAnimate(t: number) {
    requestAnimationFrame(this.customAnimate.bind(this));

    if (this.visual && this.ctx) {
      this.visual.animate(this.ctx);
    }
  }
}
