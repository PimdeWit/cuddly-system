import CONSTANTS from '../../modules/constants';

const DEFAULT_MOVE = 'default-move';

class Attack {
  /**
   * 
   * @param {String} initiator The attacker.
   * @param {String} target The victim.
   * @param {String} move The attack move used.
   */
	constructor(initiator, target, move = DEFAULT_MOVE) {
		this._initiator = initiator;
		this._target = target;
		this._move = move;


		this._setup();
	}

	_setup() {
		this._checkIfEntityIsAlive(this._target);
		const damage = this._calculateDamage();
		this._target.health = this._target.health - damage;

		console.info(`${this._initiator.id} attacked ${this._target.id} for ${damage} damage!`);
		console.warn(`${this._target.id} has ${this._target.health} health left!`);
	}

	_calculateDamage() {
		const level = this._initiator.level;
		const strength = this._initiator.strength;
		return level * strength;
	}

	_checkIfEntityIsAlive(target) {
		if (target <= 0) return console.warn('This target is already dead!');	
	}
}
export default Attack;
