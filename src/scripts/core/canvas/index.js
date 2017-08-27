import '../../../styles/core/canvas.scss';
import UTILITY_ATTRIBUTES from '../constants/utilityAttributes';
import { SHELL } from '../utilities/dom';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

class Canvas {
  /**
   *
   * @param {String} id The canvas ID.
   * @param {String} className Class name for the canvas. (OPTIONAL)
   * @param {Number} width The canvas width. (OPTIONAL) Defaults to 500.
   * @param {Number} height The canvas height. (OPTIONAL) Defaults to 500
   * @param {Boolean} hidden Set to true to hide the canvas on creation.
   */
  constructor(id, className, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, hidden = false) {
    this._bindFunctions();

    /** @type {Number} */
    this._width = 0;

    /** @type {Number} */
    this._height = 0;

    /** @type {Boolean} */
    this._hidden = hidden;

    /** @type {Boolean} */
    this._userSelect = true;

    /** @type {Boolean} */
    this._isRendered = false;

    this.element = document.createElement('canvas');
    this.element.id = id;
    this.element.classList.add(className);

    this.context = this.element.getContext('2d');

    this.width = width;
    this.height = height;

    this.hidden = hidden;

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

  set width(newWidth) {
    this._width = newWidth;
    this._resize();
  }

  /** @returns {Number} */
  get width() {
    return this._width;
  }

  set height(value) {
    this._height = value;
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
