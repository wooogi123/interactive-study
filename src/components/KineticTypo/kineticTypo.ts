import { TypoType1 } from './type1';
import { TypoType7 } from './type7';

export default class KineticTypo extends HTMLElement {
  constructor() {
    super();

    const type = this.getAttribute('type');
    
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.innerHTML = `
      canvas {
        width: 100%;
        height: 100%;
      }
    `;
    shadowRoot.appendChild(style);

    WebFont.load({
      custom: {
        families: ['iA Writer Mono:700'],
      },
      fontactive: () => {
        if (type === '1') {
          const canvas = this.drawNewCanvas(shadowRoot)
          new TypoType1(canvas);
        } else {
          const canvas = this.drawNewCanvas(shadowRoot)
          new TypoType7(canvas);
        }
      },
    });
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ) {
    if (name !== 'type') return;
    if (oldValue === null) return;
    if (newValue === oldValue) return;
    if (this.shadowRoot === null) return;

    if (newValue === '1') {
      const canvas = this.drawNewCanvas(this.shadowRoot)
      new TypoType1(canvas);
    } else {
      const canvas = this.drawNewCanvas(this.shadowRoot)
      new TypoType7(canvas);
    }
  }

  private drawNewCanvas(root: ShadowRoot): HTMLCanvasElement {
    const el = root.getElementById('typo-canvas');
    if (el) root.removeChild(el);
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'typo-canvas');
    root.appendChild(canvas);
    return canvas;
  }
}

customElements.define('kinetic-typo-element', KineticTypo);
