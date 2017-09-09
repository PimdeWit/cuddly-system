import '../styles/main.scss';
import Boot from './boot/index';
import Map from './core/map/index';
import Canvas from './core/canvas/index';
import {Load, Remove as RemoveFromCache, RemoveAll as RemoveAllFromCache} from './core/loaders/index';

class Game {
  constructor() {
    this.boot = new Boot('../../images/lorem.png');

    const canvas = new Canvas(500, 500);
    this.gameCanvas = new Map(canvas);

  }

  showMenu() {
  }
}

window.onload = () => {
  const app = new Game();
};
