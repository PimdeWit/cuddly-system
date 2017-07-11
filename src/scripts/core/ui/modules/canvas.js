import UI, {WRAPPER_CENTERED_CLASS} from '../base';

const MANDATORY_CLASS = 'game-canvas';
const HIDDEN_CLASS = 'game-canvas--hidden';

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;

class Canvas extends UI {
  /**
   * 
   * @param {String} id The canvas ID.
   * @param {String} className Classname for the canvas. (OPTIONAL)
   * @param {Number} width The canvas width. (OPTIONAL) Defaults to 500.
   * @param {Number} height The canvas height. (OPTIONAL) Defaults to 500
   * @param {Boolean} hidden Set to true to hide the canvas on creation.
   */
	constructor(id, className, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT,
      hidden = false) {
    super();

    this.wrapper = this._createWrapper(WRAPPER_CENTERED_CLASS);
    this.element = this._createElement('canvas', className);

    this.hidden = hidden;

    this.width = width;
    this.height = height;

    this.resize();

    if (this.hidden) {
      this.hide();
    }

    this.element.id = id;
    this.element.classList.add(MANDATORY_CLASS);

    this._isRendered = this._setReady();
	}

  get rendered() {
    return this._isRendered;
  }

  /**
   * @return {Boolean}
   */
  _setReady() {
    return new Promise((resolve, reject) => {
      this._appendElement(this.wrapper, this.element);
      this._appendElement(this.container, this.wrapper);

      requestAnimationFrame(() => resolve());
    });
  }


  /**
   * Resize the canvas.
   * @param {Number} width Defaults to stored width.
   * @param {Number} height Defaults to stored height.
   */
  resize(width = this.width, height = this.height) {
    if (width !== this.width) this.width = width;
    if (height !== this.height) this.height = height;

    this.element.width = width * this.pixelRatio;
    this.element.height = height * this.pixelRatio;
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
  }


  /**
   * Visually hide the canvas.
   */
  hide() {
    this.element.classList.add(HIDDEN_CLASS);
    this.hidden = true;
  }


  /**
   * Visually show the canvas.
   */
  show() {
    this.element.classList.remove(HIDDEN_CLASS);
    this.hidden = false;
  }


  /**
   * Remove the element from the dom.
   */
  dispose() {
    this.element.remove();
  }
}

export default Canvas;
