import { TypoType1 } from './type1';
import { TypoType2 } from './type2';
import { TypoType3 } from './type3';
import { TypoType4 } from './type4';
import { TypoType5 } from './type5';
import { TypoType6 } from './type6';
import { TypoType7 } from './type7';
import { digitToNumber } from './utils';

export default class KineticTypo extends HTMLElement {
  connectedCallback() {
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
        if (this.shadowRoot) {
          this.setTypoType(type, this.shadowRoot);
        }
      },
    });

    document.addEventListener('keydown', this.keydownListener.bind(this), false);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.keydownListener.bind(this), false);
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

    this.setTypoType(newValue, this.shadowRoot);
  }

  private setTypoType(numberStr: string | null, root: ShadowRoot) {
    switch (numberStr) {
      case '1': {
        const canvas = this.drawNewCanvas(root);
        new TypoType1(canvas);
        break;
      }
      case '2': {
        const canvas = this.drawNewCanvas(root);
        new TypoType2(canvas);
        break;
      }
      case '3': {
        const canvas = this.drawNewCanvas(root);
        new TypoType3(canvas, root);
        break;
      }
      case '4': {
        const canvas = this.drawNewCanvas(root);
        new TypoType4(canvas, root);
        break;
      }
      case '5': {
        const canvas = this.drawNewCanvas(root);
        new TypoType5(canvas, root);
        break;
      }
      case '6': {
        const canvas = this.drawNewCanvas(root);
        new TypoType6(canvas);
        break;
      }
      case '7': {
        const canvas = this.drawNewCanvas(root);
        new TypoType7(canvas, root);
        break;
      }
      default: {
        const canvas = this.drawNewCanvas(root);
        new TypoType7(canvas, root);
        break;
      }
    }
  }

  private keydownListener(e: KeyboardEvent) {
    const number = digitToNumber(e.code);

    if (number >= 1 && number <= 7) {
      this.setAttribute('type', `${number}`);
    }
  }

  private drawNewCanvas(root: ShadowRoot): HTMLCanvasElement {
    while (root.firstChild && root.lastChild !== null) {
      root.removeChild(root.lastChild);
    }

    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'typo-canvas');
    root.appendChild(canvas);
    return canvas;
  }
}

customElements.define('kinetic-typo-element', KineticTypo);
