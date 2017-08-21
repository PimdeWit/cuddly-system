import UI from '../index';
import UTILITY_ATTRIBUTES from '../../constants/utilityAttributes';

import { loader } from '../../loaders';

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 800;

class Canvas extends UI {
  /**
   *
   * @param {String} id The canvas ID.
   * @param {String} className Class name for the canvas. (OPTIONAL)
   * @param {Number} width The canvas width. (OPTIONAL) Defaults to 500.
   * @param {Number} height The canvas height. (OPTIONAL) Defaults to 500
   * @param {Boolean} hidden Set to true to hide the canvas on creation.
   */
  constructor(id, className, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT,
              hidden = false) {
    super();

    this._bindFunctions();

    this.wrapper = UI._createElement('div', UTILITY_ATTRIBUTES.POS_CENTERED);
    this.element = UI._createElement('canvas', className);

    this.width = width;
    this.height = height;

    this.hidden = hidden;

    this.element.id = id;

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
   * @returns {*}
   */
  get hidden() {
    return this._hidden;

  }

  set hidden(value) {
    this._hidden = value;

    console.log(this._hidden);

    if (value) {
      this.element.setAttribute(UTILITY_ATTRIBUTES.HIDDEN, '');

    } else {
      this.element.removeAttribute(UTILITY_ATTRIBUTES.HIDDEN);

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
   * @return {Boolean}
   */
  _setReady() {
    return new Promise((resolve, reject) => {
      UI._appendElement(this.wrapper, this.element);
      UI._appendElement(this.container, this.wrapper);

      requestAnimationFrame(() => resolve());
    });
  }

  set width(value) {
    this._width = value;
    this._resize();
  }

  get width() {
    return this._width;
  }

  set height(value) {
    this._height = value;
    this._resize();
  }

  get height() {
    return this._height;
  }


  /**
   * Resize the canvas.
   * @private
   */
  _resize() {
    const width = this._width === null ? DEFAULT_WIDTH : this._width;
    const height = this._height === null ? DEFAULT_HEIGHT : this._height;

    this.element.width = width * this.pixelRatio;
    this.element.height = height * this.pixelRatio;
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
  }


  /**
   * Remove the element from the dom.
   */
  dispose() {
    this.element.remove();
    this.element = null;
  }
}

export default Canvas;
