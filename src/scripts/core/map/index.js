import * as loader from '../loaders/index';

class Map {
  constructor(canvas, imagePath) {

    this._canvas = canvas;
    this._create(imagePath);
  }

  /**
   * Creation of the map.
   * @param {String} imagePath
   * @returns {Promise}
   * @private
   */
  async _create(imagePath) {
    const image = await await loader.load(imagePath).then(blob => createImageBitmap(blob));

    const pixelDataArray = await _generatePixelDataArray(image);

    const pixelCount = image.width * image.height;
    const colors = pixelCount * 4;

    let row = 0;
    let columns = 0;
    const scalar = 10;

    // Make jumps over RGBA values
    const iterationJump = 4;

    for (let i = 0; i < colors; i += iterationJump) {
      const r = pixelDataArray.data[i];
      const g = pixelDataArray.data[i + 1];
      const b = pixelDataArray.data[i + 2];
      const a = pixelDataArray.data[i + 3];

      this._canvas.context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;

      this._canvas.context.fillRect(columns * scalar, row * scalar, scalar, scalar);

      columns++;

      if ((i + iterationJump) % (image.width * iterationJump) === 0) {
        row++;
        columns = 0;
      }
    }
  }
}

export default Map;

/**
 * draw an image to a canvas, loop through the pixels, and return an array with the R,G,B colour values.
 * @param image
 * @returns {Promise}
 * @private
 */
async function _generatePixelDataArray(image) {
  return new Promise(resolve => {
    const mapDataCanvas = new OffscreenCanvas(image.width, image.height);
    const mapDataCanvasContext = mapDataCanvas.getContext('2d');

    mapDataCanvasContext.drawImage(image, 0, 0, image.width, image.height);

    resolve(mapDataCanvasContext.getImageData(0, 0, image.width, image.height));
  });
}