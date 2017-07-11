import Canvas from '../dom/canvas';

class Startup {
	constructor(parameters) {
		console.log('Startup constructor');
	}


	init() {
    this.canvas = new Canvas('startup-canvas', 'startup-canvas', 400, 400);
	}


  _addEventListeners() {

  }
}
export default Startup;
