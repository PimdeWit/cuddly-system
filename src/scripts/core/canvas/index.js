import '../../../styles/core/canvas.scss';
import UTILITY_ATTRIBUTES from '../constants/utilityAttributes';
import {SHELL} from '../../index';


const CANVAS_ATTRIBUTES = {
  DISABLE_USER_SELECT: 'no-user-select',
  LAYER: 'game-layer',
  HIDDEN: 'visuallyhidden'
};

class Canvas {
  /**
   * @param {Number} width The canvas width. (OPTIONAL) Defaults to 500.
   * @param {Number} height The canvas height. (OPTIONAL) Defaults to 500
   */
  constructor(width = SHELL.offsetWidth, height = SHELL.offsetHeight) {

    this._bindFunctions();

    /** @type {Boolean} */
    this._isRendered = false;

    this.domElement = document.createElement('canvas');
    this.domElement.setAttribute(CANVAS_ATTRIBUTES.LAYER, '');
    this.domElement.setAttribute(CANVAS_ATTRIBUTES.DISABLE_USER_SELECT, '');

    this.context = this.domElement.getContext('2d');

    this.width = width;
    this.height = height;

    this._isRendered = this._setReady();
  }

  _bindFunctions() {
    const resizeFn = this._resize.bind(this);
    this.__resizeTimeout = null;
    this._resize = () => {
      clearTimeout(this.__resizeTimeout);
      this.__resizeTimeout = setTimeout(resizeFn, 0);
    };
  }

  /**
   * Checks if the canvas domElement is visually hidden in the document.
   * @returns {Boolean}
   */
  get hidden() {
    return this._hidden;
  }

  /**
   * @param {Boolean} value
   */
  set hidden(value) {
    this._hidden = value;

    if (value) {
      this.domElement.setAttribute(UTILITY_ATTRIBUTES.HIDDEN, '');
    } else {
      this.domElement.removeAttribute(UTILITY_ATTRIBUTES.HIDDEN);
    }

  }

  /** @returns {Boolean} */
  get selectable() {
    return this._userSelect;
  }

  /**
   * @param {Boolean} isSelectable
   */
  set selectable(isSelectable) {
    this._userSelect = isSelectable;

    if (isSelectable) {
      this.domElement.removeAttribute(UTILITY_ATTRIBUTES.USER_SELECT);
    } else {
      this.domElement.setAttribute(UTILITY_ATTRIBUTES.USER_SELECT, '');
    }
  }

  /**
   * Checks if the canvas domElement is rendered in the DOM.
   * @returns {Boolean}
   */
  get rendered() {
    return this._isRendered;
  }

  /**
   * @param {Number} newWidth
   */
  set width(newWidth) {
    this._width = newWidth;
    this._resize();
  }

  /** @returns {Number} */
  get width() {
    return this._width;
  }

  /**
   * @param {Number} heightInPixels
   */
  set height(heightInPixels) {
    this._height = heightInPixels;
    this._resize();
  }

  /** @returns {Number} */
  get height() {
    return this._height;
  }

  /** @returns {Number} */
  get centerX() {
    return this._width / 2;
  }

  /** @returns {Number} */
  get centerY() {
    return this._height / 2;
  }

  /** @returns {Boolean} */
  _setReady() {
    return new Promise((resolve, reject) => {
      SHELL.appendChild(this.domElement);

      requestAnimationFrame(() => resolve());
    });
  }

  /** @private */
  _resize() {
    this.domElement.width = this._width;
    this.domElement.height = this._height;

    this.domElement.style.width = `${this._width}px`;
    this.domElement.style.height = `${this._height}px`;
  }

  /**
   * Remove the domElement from the DOM and do some garbage collection.
   */
  dispose() {
    this.domElement.remove();
    this.domElement = null;
  }
}

export default Canvas;
