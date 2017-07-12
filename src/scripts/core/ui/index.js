import '../../../styles/ui/ui.scss';

export const WRAPPER_CENTERED_CLASS = 'wrapper-centered';

class UI {
	constructor(parameters) {
    this.container = document.getElementById('app') || document.body;
    this.pixelRatio = window.devicePixelRatio;
		this.elements = {};
	}


	/**
	 * Create a wrapper.
	 * @param {String|undefined} className
	 * @return {HTMLElement}
	 * @private
	 */
	_createWrapper(className) {
		return this._createElement('div', className);
	}


	/**
	 * Create am element
	 * @param {String} tagName The tagname of the element.
	 * @param {String|undefined} className The classname
	 * @return {HTMLElement}
	 * @private
	 */
	_createElement(tagName = 'div', className) {
		let element = document.createElement(tagName);

		if (className) {
      element.classList.add(className);
    }

		return element;
	}


  /**
   * @param {HTMLElement} parent The destination element.
   * @param {HTMLElement} element This element will get appended to parent.
   * @private
   */
	_appendElement(parent, element) {
		parent.appendChild(element);

    if (element.id) {
      this.elements[element.id] = element.id;
    }
	}
}


export default UI;
