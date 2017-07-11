import '../styles/main.scss';

import '../styles/main.scss';
import Boot from './core/boot/base';


class Game {
	constructor() {
		this.boot = null;
	}


	init() {
		this.boot = new Boot();
		this.boot.showStartup();
	}
}

window.onload = () => {
	var app = new Game();
	app.init();
};
