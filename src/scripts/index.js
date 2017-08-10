import '../styles/main.scss';

import '../styles/main.scss';
import Boot from './core/boot/index';
// import Loader from './loaders/index';


class Game {
  constructor() {
    this.loader = null;
    this.boot = null;
  }


  init() {
    this.boot = new Boot();

    // this.loader = new Loader();
    // this.loader.load('/images/1234.jpg');
    // this.loader.load('/images/1234.png');
    // this.loader.load('/images/1234.pdf');
  }
}

window.onload = () => {
  const app = new Game();
  app.init();
};
