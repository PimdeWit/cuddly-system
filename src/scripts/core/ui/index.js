export const WRAPPER_CENTERED_CLASS = 'wrapper-centered';

class UI {
  constructor() {
    this.container = document.getElementById('app') || document.body;
    this.pixelRatio = window.devicePixelRatio;
    this.elements = {};
  }


  /**
   * Create am element
   * @param {String} tagName The tagname of the element.
   * @param {!String} className The classname
   * @return {HTMLElement}
   * @memberof UI
   * @static
   */
  static createElement(tagName = 'div', className) {
    let element = document.createElement(tagName);

    if (className) {
      element.classList.add(className);
    }

    return element;
  }


  /**
   * @memberof UI
   * @param {HTMLElement} parent The destination element.
   * @param {HTMLElement} element This element will get appended to parent.
   * @private
   * @static
   */
  static appendElement(parent, element) {
    parent.appendChild(element);
  }
}


export default UI;
