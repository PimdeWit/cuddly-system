import '../styles/main.scss';
import Map from './core/map/index';
import Canvas from './core/canvas/index';
import * as loader from './core/loaders/index';

export let SHELL = null;

class Game {
  constructor(shell) {

    SHELL = shell;

    this.MapCanvas = new Canvas();
    this.MapCanvas.domElement.id = 'map';

    this.tutorialMap = new Map(this.MapCanvas, '../../images/map.png');

    this.initialise();
  }

  async initialise() {
    await this.tutorialMap.generateMap();

    const sprites = await loader.loadBatch(['../../images/gym.png', '../../images/1234.jpg', '../../images/1234.png', '../../images/123.png']);
    let sprite = null;

    this.tutorialMap.tiles.forEach(tile => {
      if (tile.r === 3) sprite = sprites[0];
      if (tile.r === 255) sprite = sprites[2];

      this.MapCanvas.context.drawImage(sprite, tile.x, tile.y, tile.width, tile.height);
    });

  }
}

window.onload = () => new Game(document.querySelector('#app'));
