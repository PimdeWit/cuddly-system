import Attack from '../../modules/battle/attack';

class Entity {
  /**
   * Lorem ipsum dolor sit amet
   * @param {String} id The entity ID.
   * @param {String} firstname 
   * @param {String} lastname 
   * @param {Number} level 
   * @param {Number} strength 
   * @param {Number} health 
   */
  constructor(id, firstName, lastName, level = 1, strength = 6, health = 26) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._level = level;
    this._strength = strength;
    this._health = health;
  }


  render() {
  }

}
export default Entity;
