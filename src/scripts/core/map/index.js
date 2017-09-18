import * as loader from '../loaders/index';
import {SHELL} from '../../index';

class Map {
  constructor(canvas, imagePath) {

    console.log(SHELL);

    /** @type {HTMLCanvasElement} */
    this._canvas = canvas;

    /** @type {ImageBitmap|HTMLImageElement|Null} */
    this._image = null;

    /** @type {Array} */
    this._tiles = [];

    /** @type {String} */
    this._imagePath = imagePath;

    /** @type {Number} */
    this._scalar = SHELL.offsetWidth / 8;

    /** @type {Uint8Array} */
    this._pixelDataArray = [];
  }

  /** @returns {Promise} */
  async generateMap() {
    this._image = await loader.load(this._imagePath);
    this._pixelDataArray = await _generatePixelDataArray(this._image);
    this._tiles = await this._generateTiles(this._image.width, this._image.height, this._pixelDataArray);
  }

  /**
   * Create an object and return an object of all tiles.
   * @param {Number} gridWidth
   * @param {Number} gridHeight
   * @param {Uint8Array} pixelData
   * @returns {Promise}
   * @private
   */
  async _generateTiles(gridWidth = 8, gridHeight = 8, pixelData) {
    return new Promise(resolve => {
      const width = gridWidth;
      const height = gridHeight;
      const tiles = [];

      // pixelDataArray is a flat array, repeating R, G, B, A. Thus we need to iterate times 4 instead of 1.
      const RGBAGroup = 4;

      const pixelCount = width * height;
      const pixels = pixelCount * RGBAGroup;

      let row = 0;
      let columns = 0;

      for (let i = 0; i < pixels; i += RGBAGroup) {
        const r = pixelData.data[i];
        const g = pixelData.data[i + 1];
        const b = pixelData.data[i + 2];
        const a = pixelData.data[i + 3];

        const tile = {
          x: columns * this.scalar,
          y: row * this.scalar,
          width: this.scalar,
          height: this.scalar,
          fill: `rgba(${r}, ${g}, ${b}, ${a})`,
          r: r,
          g: g,
          b: b
        };

        tiles.push(tile);

        columns++;

        if ((i + RGBAGroup) % (width * RGBAGroup) === 0) {
          row++;
          columns = 0;
        }
      }

      resolve(tiles);
    });
  }

  /** @returns {Object} */
  get tiles() {
    return this._tiles;
  }

  /** @returns {Number} */
  get scalar() {
    return this._scalar;
  }

  /** @param {Number} scalar */
  set scalar(scalar) {
    this._scalar = scalar;

    this.generateMap(this._image);
  }

  /**
   * Remove all contents
   */
  dispose() {
    this._canvas = null;
    this._image = null;
    this._pixelDataArray = null;
    this._tiles = null;
    this._scalar = null;
  }
}

export default Map;

/**
 * draw an image to a canvas, loop through the pixels, and return an array with the R, G, B, A colour values.
 * @param image
 * @returns {Promise}
 * @private
 */
export async function _generatePixelDataArray(image) {
  return new Promise(resolve => {

    const mapDataCanvas = new OffscreenCanvas(image.width, image.height);
    const mapDataCanvasContext = mapDataCanvas.getContext('2d');

    mapDataCanvasContext.drawImage(image, 0, 0, image.width, image.height);

    resolve(mapDataCanvasContext.getImageData(0, 0, image.width, image.height));
  });
}
