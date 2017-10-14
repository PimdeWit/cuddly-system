/** An animated body */
class Entity {
  /**
   * @param {String} id
   * @param {Object} position
   * @param {Number} position.x
   * @param {Number} position.y
   * @param {Object} parameters
   * @param {String} parameters.name
   */
  constructor(id, position = {x: 0, y: 0}, parameters = {name: '???'}) {
    /**
     * @readonly
     * @private
     */
    this._id = id;

    /** @private */
    this._name = parameters.name;

    /** @private */
    this._position = position;
  }

  /**
   * Get the ID.
   * @returns {String}
   */
  get id() {
    return this._id;
  }

  /**
   * Returns the position.
   * @returns {Object}
   */
  get position() {
    return this._position;
  }

  /**
   * Sets the position.
   * @param {Object} coordinates
   * @param {Number} coordinates.x
   * @param {Number} coordinates.y
   */
  set position(coordinates) {
    this._position = coordinates;
  }

  /**
   * Returns the name.
   * @returns {String}
   */
  get name() {
    return this._name;
  }

  /**
   * Change the entities name.
   * @param {String} name
   */
  set name(name) {
    this._name = name;
  }
}

export default Entity;
