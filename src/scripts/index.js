import '../styles/main.scss';
import Map from './core/spritemap/index';
import Canvas from './core/canvas/index';
import * as loader from './core/loaders/index';

export let SHELL = null;
export let SCALE = null;

class Game {

  constructor(shell) {

    SHELL = shell;
    SCALE = window.devicePixelRatio;

    this.MapCanvas = new Canvas();
    this.MapCanvas.domElement.id = 'map';

    this.playerCanvas = new Canvas();
    this.playerCanvas.domElement.id = 'player';

    this.tutorialMap = new Map(this.MapCanvas, '../../images/map.png');

    this.initialise();
  }

  async initialise() {
    await this.tutorialMap.generateMap();

    const sprites = await loader.loadBatch(['../../images/debug/debug_blue.png', '../../images/debug/debug_red.png', '../../images/debug/debug_yellow.png']);
    let sprite = null;

    this.tutorialMap.tiles.forEach(tile => {
      if (tile.colors.r === 3) sprite = sprites[0];
      if (tile.colors.r === 255) sprite = sprites[2];

      this.MapCanvas.context.drawImage(sprite, tile.x, tile.y, tile.width, tile.height);

      this.playerCanvas.context.fillStyle = `rgba(${tile.colors.r}, ${tile.colors.g}, ${tile.colors.b}, 0.4)`;
      this.playerCanvas.context.fillRect(tile.x, tile.y, tile.width, tile.height);
      this.playerCanvas.context.fillStyle = 'red';
    });

    this.render();
  }

  render() {
    //requestAnimationFrame(this.render.bind(this));

    this.playerCanvas.context.clearRect(0, 0, this.playerCanvas.width, this.playerCanvas.height);
    this.playerCanvas.context.fillRect(128 * SCALE, 128 * SCALE, 64 * SCALE, 64 * SCALE);

    console.log('hey');
  }

}

window.onload = () => new Game(document.querySelector('#app'));
