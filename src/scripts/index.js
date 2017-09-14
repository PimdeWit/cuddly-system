import '../styles/main.scss';
import Boot from './boot/index';
import Map from './core/map/index';
import Canvas from './core/canvas/index';
import * as loader from './core/loaders/index';

class Game {
  constructor() {
    this.boot = new Boot('../../images/lorem.png');

    this.canvasMap = new Canvas(500, 500);

    this.gameCanvas = new Map(this.canvasMap, '../../images/map.png');

    this.init();
  }

  async init() {
    await this.gameCanvas.generateMap();
    console.log(this.gameCanvas.tiles);

    this.gameCanvas.tiles.forEach(tile => {
      this.canvasMap.context.fillStyle = tile.fill;
      this.canvasMap.context.fillRect(tile.x, tile.y, tile.width, tile.height);
    });
  }

  showMenu() {
  }
}

window.onload = () => {
  const app = new Game();
};
