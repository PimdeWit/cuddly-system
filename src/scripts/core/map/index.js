import {Load} from '../loaders/index';

class Map {
  constructor(canvas) {

    console.log(canvas);

    this._canvas = canvas.element;
    this._ctx = canvas.element.getContext('2d');

    this._init();
  }

  async _init() {
    const image = await Load('../../images/map.png').then(blob => createImageBitmap(blob));

    this._ctx.drawImage(image, 0, 0, image.width, image.height);

    let array = [];

    for (let i = 0; i < image.width; i++) {
      for (let j = 0; j < image.height; j++) {
        array.push(this._ctx.getImageData(i, j, 1, 1));
      }
    }

    console.log(array);
  }

  _getMapImage() {

  }
}

export default Map;
