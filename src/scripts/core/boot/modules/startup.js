import Canvas from '../../ui/modules/canvas';

class Startup {
	constructor() {
    this.canvas = new Canvas('startup', 'startup', 400, 400, true);

    this.canvas.rendered.then(() => this.canvas.show());
	}
}
export default Startup;
