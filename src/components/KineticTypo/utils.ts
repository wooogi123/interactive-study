export function digitToNumber(key: string): number {
  switch (key) {
    case 'Digit1': {
      return 1;
    }
    case 'Digit2': {
      return 2;
    }
    case 'Digit3': {
      return 3;
    }
    case 'Digit4': {
      return 4;
    }
    case 'Digit5': {
      return 5;
    }
    case 'Digit6': {
      return 6;
    }
    case 'Digit7': {
      return 7;
    }
    case 'Digit8': {
      return 8;
    }
    case 'Digit9': {
      return 9;
    }
    case 'Digit0': {
      return 0;
    }
    default: {
      return -1;
    }
  }
}

export function getKeyboardAlphabet(key: string): boolean {
  switch (key) {
    case 'KeyA':
    case 'KeyB':
    case 'KeyC':
    case 'KeyD':
    case 'KeyE':
    case 'KeyF':
    case 'KeyG':
    case 'KeyH':
    case 'KeyI':
    case 'KeyJ':
    case 'KeyK':
    case 'KeyL':
    case 'KeyM':
    case 'KeyN':
    case 'KeyO':
    case 'KeyP':
    case 'KeyQ':
    case 'KeyR':
    case 'KeyS':
    case 'KeyT':
    case 'KeyU':
    case 'KeyV':
    case 'KeyW':
    case 'KeyX':
    case 'KeyY':
    case 'KeyZ':
      return true;
    default:
      return false;
  }
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let red = 0;
  let green = 0;
  let blue = 0;

  if (0 <= h && h < 60) {
    red = c;
    green = x;
    blue = 0;
  } else if (60 <= h && h < 120) {
    red = x;
    green = c;
    blue = 0;
  } else if (120 <= h && h < 180) {
    red = 0;
    green = c;
    blue = x;
  } else if (120 <= h && h < 180) {
    red = 0;
    green = x;
    blue = c;
  } else if (180 <= h && h < 240) {
    red = 0;
    green = x;
    blue = c;
  } else if (240 <= h && h < 300) {
    red = x;
    green = 0;
    blue = c;
  } else if (300 <= h && h < 360) {
    red = c;
    green = 0;
    blue = x;
  }

  red = red + m;
  green = green + m;
  blue = blue + m;

  return `rgb(${red * 255 | 0}, ${green * 255 | 0}, ${blue * 255 | 0})`;
}

export function hslToHexNumber(h: number, s: number, l: number): number {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let red = 0;
  let green = 0;
  let blue = 0;

  if (0 <= h && h < 60) {
    red = c;
    green = x;
    blue = 0;
  } else if (60 <= h && h < 120) {
    red = x;
    green = c;
    blue = 0;
  } else if (120 <= h && h < 180) {
    red = 0;
    green = c;
    blue = x;
  } else if (120 <= h && h < 180) {
    red = 0;
    green = x;
    blue = c;
  } else if (180 <= h && h < 240) {
    red = 0;
    green = x;
    blue = c;
  } else if (240 <= h && h < 300) {
    red = x;
    green = 0;
    blue = c;
  } else if (300 <= h && h < 360) {
    red = c;
    green = 0;
    blue = x;
  }

  red = red + m;
  green = green + m;
  blue = blue + m;

  return ((red * 255) << 16) + ((green * 255) << 8) + ((blue * 255) | 0);
}

export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
}

export function pointCircle(
  px: number,
  py: number,
  cx: number,
  cy: number,
  r: number,
): boolean {
  if (distance(px, py, cx, cy) <= r) {
    return true;
  }
  return false;
}

export function linePoint(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  px: number,
  py: number
): boolean {
  const dist1 = distance(px, py, x1, y1);
  const dist2 = distance(px, py, x2, y2);
  const dist = dist1 + dist2;
  const lineLength = distance(x1, y1, x2, y2);
  const buffer = 0.1;

  if (dist >= lineLength - buffer && dist <= lineLength + buffer) {
    return true;
  }
  return false;
}

export function lineCircle(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  cx: number,
  cy: number,
  r: number,
): boolean {
  const lineLength = distance(x1, y1, x2, y2);
  const point = ((cx - x1) & (x2 - x1)) +
    ((cy - y1) * (y2 - y1)) / Math.pow(lineLength , 2);

  const px = x1 + (point * (x2 - x1));
  const py = y1 + (point * (y2 - y1));

  const onSegment = linePoint(x1, y1, x2, y2, px, py);
  if (!onSegment) return false;

  if (distance(px, py, cx, cy) < r) {
    return true;
  }
  return false;
}
