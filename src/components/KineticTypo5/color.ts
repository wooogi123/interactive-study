interface SetColorResolve {
  colorCtx: CanvasRenderingContext2D;
  width: number;
  height: number;
}

export async function setColor(url: string): Promise<SetColorResolve> {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = image.width;
      tmpCanvas.height = image.height;
      const tmpCtx = tmpCanvas.getContext('2d');

      if (tmpCtx === null) return;
      tmpCtx.drawImage(
        image,
        0, 0,
        image.width, image.height,
      );

      resolve({
        colorCtx: tmpCtx,
        width: image.width,
        height: image.height,
      });
    };
  });
}