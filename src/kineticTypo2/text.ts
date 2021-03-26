export default class Text {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  dotPos(
    density: number,
    stageWidth: number,
    stageHeight: number,
  ) {
    if (this.ctx === null) return;
    const imageData = this.ctx.getImageData(
      0, 0,
      stageWidth, stageHeight,
    ).data;

    const particles = [];
    let i = 0;
    let width = 0;
    let pixel;

    for (let height = 0; height < stageHeight; height += density) {
      ++i;
      const slide = (i % 2) === 0;
      width = 0;
      if (slide) {
        width += 6;
      }

      for (width; width < stageWidth; width += density) {
        pixel = imageData[((width + (height * stageWidth)) * 4) - 1];
        if (pixel != 0 
          && width > 0
          && width < stageWidth
          && height > 0
          && height < stageHeight) {
          particles.push({
            x: width,
            y: height,
          });
        }
      }
    }

    return particles;
  }

  setText(
    str: string,
    density: number,
    stageWidth: number,
    stageHeight: number,
  ) {
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    if (this.ctx === null) return;

    const myText = str;
    const fontWidth = 700;
    const fontSize = 800;
    const fontName = 'Hind';

    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.textBaseline = 'middle';
    const fontPos = this.ctx.measureText(myText);
    this.ctx.fillText(
      myText,
      (stageWidth - fontPos.width) / 2,
      fontPos.actualBoundingBoxAscent +
      fontPos.actualBoundingBoxDescent +
      ((stageHeight - fontSize) / 2),
    );

    return this.dotPos(density, stageWidth, stageHeight);
  }
}