import Startup from './modules/startup';

class Boot {
	constructor(parameters) {
	}


	showStartup() {
		this._startup = new Startup();
	}
}
export default Boot;
