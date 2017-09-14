import '../styles/main.scss';
import Boot from './boot/index';
import Map from './core/map/index';
import Canvas from './core/canvas/index';
import * as loader from './core/loaders/index';

class Game {
  constructor() {
    this.boot = new Boot('../../images/lorem.png');

    this.MapCanvas = new Canvas(512, 512);
    this.tutorialMap = new Map(this.MapCanvas, '../../images/map.png');

    this.init();
  }

  async init() {
    await this.tutorialMap.generateMap();

    const imageblobs = await loader.loadBatch(['../../images/lorem.png', '../../images/1234.jpg', '../../images/1234.png']);
    const a = imageblobs;

    console.log(a[0]);

    a[0] = await createImageBitmap(imageblobs[0]);

    console.log(a[0]);

    setTimeout(() => {
      this.tutorialMap.tiles.forEach(tile => {
        var item = Math.floor(Math.random() * a.length);
        this.MapCanvas.context.fillStyle = tile.fill;
        this.MapCanvas.context.drawImage(a[item], tile.x, tile.y, tile.width, tile.height);
      });
    }, 2000);
  }

  showMenu() {
  }
}

window.onload = () => {
  const app = new Game();
};
