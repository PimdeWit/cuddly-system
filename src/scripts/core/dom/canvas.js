import CONST_CANVAS from '../../constants/dom/canvas';
import DOM from './base';

class Canvas extends DOM {
	constructor(parameters) {
    super();

    this.scale = window.devicePixelRatio;

    this.init(parameters);
	}

  init(parameters) {
    const wrapper = this._createWrapper(this.CONST_WRAPPER.CENTERED);
    const canvas = this._createElement('canvas', parameters.className);

    const width = this._getWidth(parameters.width);
    const height = this._getHeight(parameters.height);

    if (parameters.id) canvas.id = parameters.id;
    canvas.classList.add(CONST_CANVAS.BASE_CLASS);

    this._appendElement(wrapper, canvas);
    this._appendElement(document.body, wrapper);

    canvas.width = width * this.scale;
    canvas.style.width = width;

    canvas.height = height * this.scale;
    canvas.style.height = height;
  }

  _getWidth(width = CONST_CANVAS.DEFAULT_WIDTH) {
    return width;
  }

  _getHeight(height = CONST_CANVAS.DEFAULT_HEIGHT) {
    return height;
  }
}
export default Canvas;
