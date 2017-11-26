import * as loader from '../loaders/index';
import {SHELL, SCALE} from '../../game';

class SpriteMap {
  /**
   * draw an image to a temporary canvas, loop through the pixels, and return an array with the R, G, B, A colour values.
   * @param {HTMLImageElement} image
   * @async
   * @assets
   * @returns {Promise}
   * @private
   */
  static getImagePixelData(image) {
    return new Promise(resolve => {
      const canvas = new OffscreenCanvas(image.width, image.height);
      const context = canvas.getContext('2d');

      context.drawImage(image, 0, 0, image.width, image.height);

      resolve(context.getImageData(0, 0, image.width, image.height));
    });
  }

    /**
     * Create a readable object from a pixelData array
     * @param {UInt8Array|Array} imageData
     * @param {Number} tileSize
     * @async
     * @assets
     * @returns {Promise}
     * @private
     */
  static generateTiles(imageData, tileSize) {
    return new Promise(resolve => {
      const tiles = [];

      const width = imageData.width;
      const height = imageData.height;

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
          x: columns * tileSize,
          y: row * tileSize,
          width: tileSize,
          height: tileSize,
          colors: [r, g, b, a]
        };

        tiles.push(tile);

        columns++;

        // If the cursor is at the last item in a single ROW, then move the cursor x: 0 && y: y++.
        const setCursorToNewline = (i + singleIterationLength) % (width * singleIterationLength) === 0;

        if (setCursorToNewline) {
          row++;
          columns = 0;
        }
      }

      resolve(tiles);
    });
  }

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
  async generateMap(image) {
    if (image) this._image = image;
    this._imageData = await SpriteMap.getImagePixelData(this._image);
    this._scalar = (SHELL.offsetWidth / this._imageData.width) * SCALE;

    this._tiles = await SpriteMap.generateTiles(this._imageData, this._scalar);
  }

  /** @returns {Object} */
  get tiles() {
    console.log(this._tiles);
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
