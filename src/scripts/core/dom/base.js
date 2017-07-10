import '../../../styles/dom/dom.scss';
import CONST_WRAPPER from '../../constants/dom/wrapper';

class DOM {
	constructor(parameters) {
		console.log('DOM constructor');
		this.CONST_WRAPPER = CONST_WRAPPER;
		this.elements = null;
	}

	init() {
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
	 * @param {String} tagName 
	 * @param {String|undefined} className
	 * @return {HTMLElement}
	 * @private
	 */
	_createElement(tagName = 'div', className) {
		const element = document.createElement(tagName);
		if (className) element.classList.add(className);

		return element;
	}

	_appendElement(parent, element) {
		parent.appendChild(element);
	}
}
export default DOM;
