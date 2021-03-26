import { KineticTypo1 } from './components/KineticTypo1';
import { KineticTypo2 } from './components/KineticTypo2';
import { KineticTypo3 } from './components/KineticTypo3';
import { KineticTypo4 } from './components/KineticTypo4';
import { KineticTypo5 } from './components/KineticTypo5';

(function () {
  customElements.define('kinetic-typo-element1', KineticTypo1);
  customElements.define('kinetic-typo-element2', KineticTypo2);
  customElements.define('kinetic-typo-element3', KineticTypo3);
  customElements.define('kinetic-typo-element4', KineticTypo4);
  customElements.define('kinetic-typo-element5', KineticTypo5);

  let current: number = 0;

  const kineticTypo1 = new KineticTypo1();
  const kineticTypo2 = new KineticTypo2();
  const kineticTypo3 = new KineticTypo3();
  const kineticTypo4 = new KineticTypo4();
  const kineticTypo5 = new KineticTypo5();

  const typos = [
    kineticTypo1,
    kineticTypo2,
    kineticTypo3,
    kineticTypo4,
    kineticTypo5,
  ];

  let currentItem = typos[current];

  document.addEventListener('keydown', (e) => {
    switch (e.code) {
      case 'Digit1': {
        current = 0;
        document.body.removeChild(currentItem);
        document.body.appendChild(typos[current]);
        currentItem = typos[current];
        break;
      }
      case 'Digit2': {
        current = 1;
        document.body.removeChild(currentItem);
        document.body.appendChild(typos[current]);
        currentItem = typos[current];
        break;
      }
      case 'Digit3': {
        current = 2;
        document.body.removeChild(currentItem);
        document.body.appendChild(typos[current]);
        currentItem = typos[current];
        break;
      }
      case 'Digit4': {
        current = 3;
        document.body.removeChild(currentItem);
        document.body.appendChild(typos[current]);
        currentItem = typos[current];
        break;
      }
      case 'Digit5': {
        current = 4;
        document.body.removeChild(currentItem);
        document.body.appendChild(typos[current]);
        currentItem = typos[current];
        break;
      }
      default: {
        break;
      }
    }
  }, false);


  let sumDeltaY: number = 0;
  document.addEventListener('wheel', (e: WheelEvent) => {
    sumDeltaY += e.deltaY;
    if (sumDeltaY > 500) {
      sumDeltaY = 0;
      if (current >= 4) return;
      current += 1;
      document.body.removeChild(currentItem);
      document.body.appendChild(typos[current]);
      currentItem = typos[current]
      return;
    }
    if (sumDeltaY < -500) {
      sumDeltaY = 0;
      if (current <= 0) return;
      current -= 1;
      document.body.removeChild(currentItem);
      document.body.appendChild(typos[current]);
      currentItem = typos[current]
      return;
    }
  }, false);

  window.onload = () => {
    document.body.appendChild(currentItem);
  };
})();
