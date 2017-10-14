import * as loader from '../loaders/index';
import {SHELL, SCALE} from '../../index';

class Map {
  constructor(canvas, imagePath) {
    /** @type {HTMLCanvasElement} */
    this._canvas = canvas;

    /** @type {ImageBitmap|HTMLImageElement|Null} */
    this._image = null;

    /** @type {Array} */
    this._tiles = [];

    /** @type {String} */
    this._imagePath = imagePath;

    /** @type {Number} */
    this._scalar = (SHELL.offsetWidth / 8) * SCALE;

    /** @type {Array} */
    this._pixelDataArray = [];
  }

  /** @returns {Promise} */
  async generateMap() {
    this._image = await loader.load(this._imagePath);

    this._pixelDataArray = await _generatePixelDataArray(this._image);

    this._tiles = await this._generateTiles(this._pixelDataArray);
  }

  /**
   *
   * @param {Object} pixelData
   * @param {Array} pixelData.data
   * @param {Array} pixelData.dataUnion
   * @param {Number} pixelData.width
   * @param {Number} pixelData.height
   * @returns {Promise}
   * @private
   */
  async _generateTiles(pixelData) {
    return new Promise(resolve => {
      const tiles = [];

      const width = pixelData.width;
      const height = pixelData.height;

      // The pixelData.data array is a flat array repeating R,G,B,A. e.g Red is displayed as: `[255, 0, 0, 1]`
      const singleIterationLength = ['r', 'g', 'b', 'a'].length;

      const pixelCount = width * height;
      const pixels = pixelCount * singleIterationLength;

      let row = 0;
      let columns = 0;

      for (let i = 0; i < pixels; i += singleIterationLength) {
        const r = pixelData.data[i];
        const g = pixelData.data[i + 1];
        const b = pixelData.data[i + 2];
        const a = pixelData.data[i + 3];

        const tile = {
          x: columns * this.scalar,
          y: row * this.scalar,
          width: this.scalar,
          height: this.scalar,
          colors: {
            r: r,
            g: g,
            b: b,
            a: a
          }
        };

        tiles.push(tile);

        columns++;

        const setCursorToNewline = (i + singleIterationLength) % (width * singleIterationLength) === 0;

        if (setCursorToNewline) {
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
