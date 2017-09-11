import {Load} from '../loaders/index';

class Map {
  constructor(canvas, imagePath) {

    this._canvas = canvas.element;
    this._ctx = canvas.element.getContext('2d');

    this._generateMapArray(imagePath);
  }

  async _generateMapArray(path) {
    new Promise()
    const image = await Load(path).then(blob => createImageBitmap(blob));

    this._ctx.drawImage(image, 0, 0, image.width, image.height);

    const pixelDataArray = [];

    for (let i = 0; i < image.width; i++) {
      for (let j = 0; j < image.height; j++) {
        pixelDataArray.push(this._ctx.getImageData(i, j, 1, 1));
      }
    }

    return pixelDataArray;
  }

  async _getMapImage() {
    await Load(path).then(blob => createImageBitmap(blob));
  }
}

export default Map;
