const KEYS= {
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
  LEFT_ARROW: 37,
  W: 87,
  D: 68,
  S: 83,
  A: 65
};

class KeyboardManager {
  /**
   * @param {HTMLElement} element
   */
  constructor(element = window) {
    /** @param {HTMLElement} */
    this._element = element;

    /**
     * @type {Boolean}
     * @private
     */
    this._isListening = false;

    this._activeKey = null;

    this.__keyDownHandler = this._keyDownHandler.bind(this);
    this.__keyUpHandler = this._keyUpHandler.bind(this);
  }

  _keyDownHandler(event) {
    this._activeKey = this._getKeyCode(event);
  }

  _keyUpHandler(event) {
    this._activeKey = null;
  }

  /**
   * @returns {Null|Number}
   */
  get activeKey() {
    return this._activeKey;
  }

  /**
   * @returns {Boolean}
   */
  get listening() {
    return this._isListening;
  }

  /**
   * @param {KeyboardEvent} event
   * @returns {Number|*|a.ui.keyCode|{ALT, BACKSPACE, CAPS_LOCK, COMMA, COMMAND, COMMAND_LEFT, COMMAND_RIGHT, CONTROL, DELETE, DOWN, END, ENTER, ESCAPE, HOME, INSERT, LEFT, MENU, NUMPAD_ADD, NUMPAD_DECIMAL, NUMPAD_DIVIDE, NUMPAD_ENTER, NUMPAD_MULTIPLY, NUMPAD_SUBTRACT, PAGE_DOWN, PAGE_UP, PERIOD, RIGHT, SHIFT, SPACE, TAB, UP, WINDOWS}|Object}
   * @private
   */
  _getKeyCode(event) {
    return event.keyCode || event.which;
  }

  /**
   * Start listening for events.
   */
  listen() {
    this._element.addEventListener('keydown', this.__keyDownHandler);
    this._element.addEventListener('keyup', this.__keyUpHandler);
    this._isListening = true;
  }

  unlisten() {
    this._element.removeEventListener('keydown', this.__keyDownHandler);
    this._element.removeEventListener('keyup', this.__keyUpHandler);
    this._isListening = false;
    this._activeKey = null;
  }
}

export default KeyboardManager;
