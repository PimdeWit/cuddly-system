import '../styles/main.scss';
import Entity from './core/2d/entities/index';
import SpriteMap from './core/spritemap/index';
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

    this.player = new Entity('player');
    this.playerCanvas = new Canvas();
    this.playerCanvas.domElement.id = 'player';

    this.tutorialMap = new SpriteMap(this.MapCanvas, '../../images/map-debug_16x16.png');

    this.initialise().then(this.render.bind(this));
  }

  async initialise() {
    await this.tutorialMap.generateMap();

    const sprites = await loader.loadBatch(['../../images/debug/debug_blue.png', '../../images/debug/debug_red.png', '../../images/debug/debug_yellow.png']);
    let sprite = null;

    this.tutorialMap.tiles.forEach(tile => {
      if (tile.colors.r === 255) sprite = sprites[0];
      if (tile.colors.r === 128) sprite = sprites[1];
      if (tile.colors.r === 159) sprite = sprites[2];
      if (tile.colors.r === 48) sprite = sprites[2];

      if (sprite) this.MapCanvas.context.drawImage(sprite, tile.x, tile.y, tile.width, tile.height);
    });

    this.playerCanvas.context.fillStyle = 'white';
    this.player.position = {
      x: this.tutorialMap.scalar,
      y: this.tutorialMap.scalar
    };
  }

  render() {
    //requestAnimationFrame(this.render.bind(this));

    this.playerCanvas.context.clearRect(0, 0, this.playerCanvas.width, this.playerCanvas.height);
    this.playerCanvas.context.fillRect(this.player.position.x, this.player.position.y, this.tutorialMap.scalar, this.tutorialMap.scalar);
  }

}

window.onload = () => new Game(document.querySelector('#app'));
