import CONSTANTS from '../../modules/constants';
import Attack from '../../modules/battle/attack';

class Entity {
	constructor(parameters) {
		/** @type {String|Boolean} */
		this.id = parameters.id ? parameters.id : false;

		/** @type {String} */
		this.name = parameters.name ? parameters.name : `???`;

		/** @type {String|Null} */
		this.surname = parameters.surname ? parameters.surname : null;

		/** @type {Number} */
		this.level = parameters.level ? parameters.level : 1;

		/** @type {Number} */
		this.strength = parameters.strength ? parameters.strength : 1;

		/** @type {Number} */
		this.health = parameters.health ? parameters.health : 36;

		if (!this.id) throw Error('Your entity needs an ID!');
	}

	init() {
		this.logEntity();
	}

	logEntity() {
		console.table([this]);
	}

	/** @return {String} */
	getFullName() {
		return `${this.name} ${this.surname}`;
	}

	/**
	 * Attack a target!
	 * @param {Object} parameters 
	 */
	attack(parameters) {
		parameters = parameters || {};

		const _target = parameters.target ? parameters.target : null;

		if (!_target) throw Error(`${this.id}: No target specified`);

		const _move = parameters.move ? parameters.move : CONSTANTS.ENTITY.BATTLE.DEFAULT_ATTACK;

		const obj = {
			initiator: this,
			target: _target,
			move: _move
		};

		new Attack(obj);
	}
}
export default Entity;
