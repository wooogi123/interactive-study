import { KineticTypo1 } from './kineticTypo1';
import { KineticTypo2 } from './kineticTypo2';
import { KineticTypo3 } from './kineticTypo3';
import { KineticTypo4 } from './kineticTypo4';

(function () {
  let current: number = 1;

  document.addEventListener('keydown', (e) => {
    switch (e.code) {
      case 'Digit1': {
        location.hash = '#typo1';
        current = 1;
        break;
      }
      case 'Digit2': {
        location.hash = '#typo2';
        current = 2;
        break;
      }
      case 'Digit3': {
        location.hash = '#typo3';
        current = 3;
        break;
      }
      case 'Digit4': {
        location.hash = '#typo4';
        current = 4;
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
      location.hash = `#typo${current}`;
      return;
    }
    if (sumDeltaY < -500) {
      sumDeltaY = 0;
      if (current <= 1) return;
      current -= 1;
      location.hash = `#typo${current}`;
      return;
    }
  }, false);

  window.onload = () => {
    new KineticTypo1();
    new KineticTypo2();
    new KineticTypo3();
    new KineticTypo4();
  };
})();
