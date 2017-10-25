import {SHELL} from '../../game';
import Canvas from '../canvas/index';

class PhysicsLayer {
  /**
   *
   * @param {Array} tiles
   * @param {Object} options
   * @param {Boolean} debug Creates a canvas to visually see the collidable tiles.
   * @param {Array} debugColors Array of colours to paint the tiles with. [0] = fill, [1] = stroke.
   */
  constructor(tiles, debug = false, debugColors = ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.8)']) {
    this._tiles = tiles;
    this._debug = debug;

    /** @type {Array} */
    this._debugColors = debugColors;

    /** @type {Canvas} */
    this._canvas = null;

    /** @type {Boolean} */
    this._debugMapDrawn = false;

    if (this._debug) {
      this._showDebugCanvas();
      this._drawDebugMap();
    }
  }

  /** @returns {Array} */
  get tiles() {
    return this._tiles;
  }

  /** @returns {Boolean} */
  get debug() {
    return this._debug;
  }

  /**
   * @param {Boolean} whatDoICallThisBooleanLol
   */
  set debug(whatDoICallThisBooleanLol) {
    this._debug = whatDoICallThisBooleanLol;

    this._debug ? this._showDebugCanvas() : this._hideDebugCanvas();
  }

  /** @private */
  _showDebugCanvas() {
    if (!this._canvas) this._canvas = new Canvas();
    SHELL.appendChild(this._canvas.domElement);
  }

  /** @private */
  _hideDebugCanvas() {
    SHELL.removeChild(this._canvas.domElement);
  }

  /**
   * Visually draw the collidable objects.
   * @private
   */
  _drawDebugMap() {
    if (this._canvas && !this._debugMapDrawn) {
      this._canvas.context.strokeStyle = this._debugColors[0];
      this._canvas.context.fillStyle = this._debugColors[1];

      this._tiles.forEach(tile => this._canvas.context.strokeRect(tile.x, tile.y, tile.width, tile.height));
      this._canvas.context.stroke();
    }
  }

}

export default PhysicsLayer;
