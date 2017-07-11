import DOM, {WRAPPER_CENTERED_CLASS} from './base';

const MANDATORY_CLASS = 'game-canvas';
const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;

class Canvas extends DOM {
  /**
   * 
   * @param {String} id 
   * @param {String} className 
   * @param {Number} width 
   * @param {Number} height 
   */
	constructor(id, className, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
    super();

    let wrapper = this._createWrapper(WRAPPER_CENTERED_CLASS);
    let canvas = this._createElement('canvas', className);

    canvas.id = id;
    canvas.classList.add(MANDATORY_CLASS);

    canvas.width = width * this.pixelRatio;
    canvas.height = height * this.pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    this._appendElement(wrapper, canvas);
    this._appendElement(this.container, wrapper);
	}
}

export default Canvas;
