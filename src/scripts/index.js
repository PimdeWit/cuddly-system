import '../styles/main.scss';

import CONSTANTS from './modules/constants';
import Entity from './modules/entities/entity';

class Logic {
	constructor() {
		this.entities = [];
	}

	init() {
		this.player = new Entity({
			name: CONSTANTS.ENTITY.PLAYER.NAME,
			surname: CONSTANTS.ENTITY.PLAYER.SURNAME,
			id: CONSTANTS.ENTITY.PLAYER.ID,
			level: 1
		});

		this.player.init();

		this.enemy = new Entity({
			name: 'Andy',
			surname: 'Anderson',
			id: 'finalboss',
			level: 1
		});

		this.enemy.init();

		while(this.enemy.health > 0) {
			this.player.attack({target: this.enemy});
		}

	}
}

window.onload = () => {
	this.app = new Logic();
	this.app.init();
};
