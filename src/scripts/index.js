import '../styles/main.scss';
import Boot from './boot/index';
import {Load, Remove as RemoveFromCache, RemoveAll as RemoveAllFromCache} from './core/loaders/index';

class Game {
  constructor() {
    this.boot = new Boot('../../images/lorem.png');
  }

  showMenu() {
  }
}

window.onload = () => {
  const app = new Game();
};
