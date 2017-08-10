import Canvas from '../../ui/modules/canvas';

//TODO-me: Refactor "Startup" to own tree instead of being a module from 'boot'.
class Startup {
  constructor() {
    this.canvas = new Canvas('startup', 'startup', 400, 400, true);

    this.canvas.rendered.then(() => this.canvas.show());
  }
}
export default Startup;
