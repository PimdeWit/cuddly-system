import '../../../styles/ui/ui.scss';
import VENDOR_PREFIXES from '../constants/vendorPrefixes';

class UI {
  constructor() {
    this.container = document.getElementById('app') || document.body;
    this.pixelRatio = window.devicePixelRatio;
    this.elements = {};
  }


  /**
   * Create am element
   * @memberof UI
   * @param {String} tagName The tagname of the element.
   * @param {!String} className The classname
   * @return {HTMLElement}
   * @static
   */
  static _createElement(tagName = 'div', className) {
    const element = document.createElement(tagName);
    if (className) element.classList.add(className);
    return element;
  }


  /**
   * @memberof UI
   * @param {HTMLElement} parent The destination element.
   * @param {HTMLElement} element This element will get appended to parent.
   * @private
   * @static
   */
  static _appendElement(parent, element) {
    parent.appendChild(element);
  }

  /**
   * @memberof UI
   * @param {String} value
   * @static
   */
  static setUserSelect(value = 'none') {
    const VENDORS = [
      VENDOR_PREFIXES.WEBKIT,
      VENDOR_PREFIXES.MOZILLA,
      VENDOR_PREFIXES.IE,
      ''
    ];

    VENDORS.forEach(vendor => {
      element.style[`${vendor}user-select`] = value;
    });
  }

}


export default UI;
