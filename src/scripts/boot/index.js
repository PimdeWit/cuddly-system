import UI from '../core/ui/index';
import Canvas from '../core/ui/modules/canvas';
import UTILITY_ATTRIBUTES from '../core/constants/utilityAttributes';
class Boot {
  constructor() {
    console.log('Running %cBoot', 'color: #288bff');

    this.canvas = new Canvas('boot', 'boot', 500, 500, true);

    this.canvas.rendered.then(() => this.canvas.hidden = false);
  }




}

export default Boot;
