import { KineticTypo1 } from './components/KineticTypo1';
import { KineticTypo2 } from './components/KineticTypo2';
import { KineticTypo3 } from './components/KineticTypo3';
import { KineticTypo4 } from './components/KineticTypo4';
import { KineticTypo5 } from './components/KineticTypo5';
import { KineticTypo6 } from './components/KineticTypo6';
import { KineticTypo7 } from './components/KineticTypo7';

(function () {
  let current: number = 6;

  const kineticTypo1 = new KineticTypo1();
  const kineticTypo2 = new KineticTypo2();
  const kineticTypo3 = new KineticTypo3();
  const kineticTypo4 = new KineticTypo4();
  const kineticTypo5 = new KineticTypo5();
  const kineticTypo6 = new KineticTypo6();
  const kineticTypo7 = new KineticTypo7();

  const typos = [
    kineticTypo1,
    kineticTypo2,
    kineticTypo3,
    kineticTypo4,
    kineticTypo5,
    kineticTypo6,
    kineticTypo7,
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
      case 'Digit6': {
        current = 5;
        document.body.removeChild(currentItem);
        document.body.appendChild(typos[current]);
        currentItem = typos[current];
        break;
      }
      case 'Digit7': {
        current = 6;
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
      if (current >= 6) return;
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
