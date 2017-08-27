import '../styles/main.scss';
import Boot from './boot/index';
import Animation from './core/animations/index';
// import Loader from './loaders/index';

class Game {
  constructor() {
    this.loader = null;
    this.boot = new Boot('../../images/lorem.png');

    setTimeout(() => {
      this.boot.dispose();
      this.showMenu()
    }, 2000);
  }

  showMenu() {
  }
}

window.onload = () => {
  const app = new Game();
};
