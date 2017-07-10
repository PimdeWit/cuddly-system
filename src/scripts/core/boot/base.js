import Startup from './startup';

class Boot {
	constructor(parameters) {
		this._startup = new Startup();
	}

	showStartup() {
		this._startup.init();
	}
}
export default Boot;
