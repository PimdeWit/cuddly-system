import '../styles/main.scss';
import Boot from './boot/index';
// import Loader from './loaders/index';

class Game {
  constructor() {
    this.loader = null;
    this.boot = new Boot();
  }
}

window.onload = () => {
  const app = new Game();
};
