import CONSTANTS from '../../modules/constants';

class Attack {
	constructor(parameters) {
		/** @type {String} */
		this._initiator = parameters.initiator;

		/** @type {String} */
		this._target = parameters.target;

		/** @type {String} */
		this._move = parameters.move;

		if (!this._initiator) throw Error('No attacker specified');
		if (!this._target) throw Error('No target specified');

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
