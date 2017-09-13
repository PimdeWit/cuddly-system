import '../styles/main.scss';
import Boot from './boot/index';
import Map from './core/map/index';
import Canvas from './core/canvas/index';
import * as loader from './core/loaders/index';

class Game {
  constructor() {
    this.boot = new Boot('../../images/lorem.png');

    const canvas = new Canvas(500, 500);
    const canvasMap = new Canvas(500, 500);

    this.gameCanvas = new Map(canvasMap, '../../images/map.png');

  }

  showMenu() {
  }
}

window.onload = () => {
  const app = new Game();
};
