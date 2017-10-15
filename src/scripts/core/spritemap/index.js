import * as loader from '../loaders/index';
import {SHELL, SCALE} from '../../game';

class SpriteMap {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {ImageBitmap|HTMLImageElement|Null} image
   */
  constructor(canvas, image) {
    /**
     * @readonly
     * @private
     */
    this._canvas = canvas;

    /**
     * @type {ImageBitmap|HTMLImageElement|Null}
     * @private
     */
    this._image = image;

    /**
     * @type {Array}
     * @private
     */
    this._tiles = [];

    /**
     * @type {Number}
     * @private
     */
    this._scalar = 0;

    /**
     * @type {Array}
     * @private
     */
    this._imageData = [];

  }

  /**
   * @async
   * @returns {Promise}
   */
  async generateMap() {
    this._imageData = await _generateImageData(this._image);

    this._tiles = await this._generateTiles(this._imageData);
  }

  /**
   * Create a readable object from a pixelData array
   * @param {Object} imageData
   * @param {Array} imageData.data
   * @param {Array} imageData.dataUnion
   * @param {Number} imageData.width
   * @param {Number} imageData.height
   * @async
   * @returns {Promise}
   * @private
   */
  async _generateTiles(imageData) {
    return new Promise(resolve => {
      const tiles = [];

      const width = imageData.width;
      const height = imageData.height;

      this._scalar = (SHELL.offsetWidth / width) * SCALE;

      // The pixelData.data array is a flat array repeating R,G,B,A. e.g Red is displayed as: `[255, 0, 0, 1]`
      const singleIterationLength = ['r', 'g', 'b', 'a'].length;

      const pixelCount = width * height;
      const pixels = pixelCount * singleIterationLength;

      let row = 0;
      let columns = 0;

      for (let i = 0; i < pixels; i += singleIterationLength) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];

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
    this._imageData = null;
    this._tiles = null;
    this._scalar = null;
  }
}

export default SpriteMap;

/**
 * draw an image to a canvas, loop through the pixels, and return an array with the R, G, B, A colour values.
 * @param {HTMLImageElement} image
 * @async
 * @returns {Promise}
 * @private
 */
export async function _generateImageData(image) {
  return new Promise(resolve => {
    const mapDataCanvas = new OffscreenCanvas(image.width, image.height);
    const mapDataCanvasContext = mapDataCanvas.getContext('2d');

    mapDataCanvasContext.drawImage(image, 0, 0, image.width, image.height);

    resolve(mapDataCanvasContext.getImageData(0, 0, image.width, image.height));
  });
}
