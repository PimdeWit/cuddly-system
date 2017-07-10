import Canvas from '../dom/canvas';

class Startup {
	constructor(parameters) {
		console.log('Startup constructor');
	}

	init() {
		this.canvas = new Canvas({
			id: 'startup-canvas',
			className: 'startup-canvas'
		});
	}
}
export default Startup;
