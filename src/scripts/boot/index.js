import Canvas from '../core/ui/modules/canvas';
import Splash from '../core/ui/modules/splash';

const SPLASH_PAGES = [
  '../../images/1234.jpg',
  '../../images/1234.png',
];

class Boot {
  constructor() {
    console.log('Running %cBoot', 'color: #288bff');

    this.splash = new Splash(SPLASH_PAGES);
    this.canvas = new Canvas('boot', 'boot', 500, 500, true);
    this.canvas.element.style.backgroundColor = 'blue';

    // this.canvas.rendered.then(() => this.canvas.hidden = false);
    setTimeout(() => {
      this.canvas.hidden = false;
    }, 1000);
  }




}

export default Boot;
