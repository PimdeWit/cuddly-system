import '../../../styles/core/canvas.scss';
import UTILITY_ATTRIBUTES from '../constants/utilityAttributes';
import {SHELL} from '../utilities/dom';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

class Canvas {
  /**
   * @param {Number} width The canvas width. (OPTIONAL) Defaults to 500.
   * @param {Number} height The canvas height. (OPTIONAL) Defaults to 500
   * @param {Object} options Additional options for the canvas.
   * @param {Boolean} options.offScreen Define if it's an offScreenCanvas or a regular one
   * @param {Boolean} options.hidden Is the canvas initially hidden?
   */
  constructor(width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, options = {
    offScreen: false,
    hidden: false,
    userSelect: true
  }) {
    this._bindFunctions();

    /** @type {Boolean} */
    this._isRendered = false;

    this.element = document.createElement('canvas');

    this.context = this.element.getContext('2d');

    this.width = width;
    this.height = height;

    if (options.id) this.element.id = options.id;
    if (options.selector) this.element.className = options.selector;

    this.hidden = options.hidden;
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
   * Checks if the canvas element is visually hidden in the document.
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
      this.element.setAttribute(UTILITY_ATTRIBUTES.HIDDEN, '');
    } else {
      this.element.removeAttribute(UTILITY_ATTRIBUTES.HIDDEN);
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
      this.element.removeAttribute(UTILITY_ATTRIBUTES.USER_SELECT);
    } else {
      this.element.setAttribute(UTILITY_ATTRIBUTES.USER_SELECT, '');
    }
  }

  /**
   * Checks if the canvas element is rendered in the DOM.
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
      SHELL.appendChild(this.element);

      requestAnimationFrame(() => resolve());
    });
  }

  /** @private */
  _resize() {
    this.element.width = this._width;
    this.element.height = this._height;

    this.element.style.width = `${this._width}px`;
    this.element.style.height = `${this._height}px`;
  }

  /**
   * Remove the element from the DOM and do some garbage collection.
   */
  dispose() {
    this.element.remove();
    this.element = null;
  }
}

export default Canvas;
