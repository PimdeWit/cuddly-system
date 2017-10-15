import '../styles/main.scss';
import Entity from './core/2d/entities/index';
import SpriteMap from './core/spritemap/index';
import Canvas from './core/canvas/index';
import KeyboardManager from './core/input/keyboard';
import * as loader from './core/loaders/index';

export let SHELL = null;
export let SCALE = null;

class Game {

  constructor(shell) {

    SHELL = shell;
    SCALE = window.devicePixelRatio;

    this._createTutorial();
    this._createPlayer();

    this.initialise().then(this.render.bind(this));
  }

  _createTutorial() {
    this.tutorialCanvas = new Canvas();
    this.tutorialCanvas.domElement.id = 'map';
    this.tutorialSpriteMap = new SpriteMap(this.tutorialCanvas, '../../images/map-debug_16x16.png');
  }

  _createPlayer() {
    this.player = new Entity('player');
    this.playerCanvas = new Canvas();
    this.playerCanvas.domElement.id = 'player';
  }

  async initialise() {
    await this.tutorialSpriteMap.generateMap();

    const sprites = await loader.loadBatch(['../../images/debug/debug_blue.png', '../../images/debug/debug_red.png', '../../images/debug/debug_yellow.png']);
    let sprite = null;

    this.tutorialSpriteMap.tiles.forEach(tile => {
      if (tile.colors.r === 255) sprite = sprites[0];
      if (tile.colors.r === 128) sprite = sprites[1];
      if (tile.colors.r === 159) sprite = sprites[2];
      if (tile.colors.r === 48) sprite = sprites[2];

      if (sprite) this.tutorialCanvas.context.drawImage(sprite, tile.x, tile.y, tile.width, tile.height);
    });

    this.playerCanvas.context.fillStyle = 'white';
    this.player.position = {
      x: this.tutorialSpriteMap.scalar,
      y: this.tutorialSpriteMap.scalar
    };


    this.keyboard = new KeyboardManager();

    this.keyboard.listen();
  }


  render() {
    requestAnimationFrame(this.render.bind(this));

    if (this.keyboard.activeKey) {
      console.log(this.keyboard.activeKey);

      if (this.keyboard.activeKey === (38 || 76)) this.player.position.y--;
      if (this.keyboard.activeKey === (39 || 68)) this.player.position.x++;
      if (this.keyboard.activeKey === (40 || 83)) this.player.position.y++;
      if (this.keyboard.activeKey === (37 || 65)) this.player.position.x--;

    }



    this.playerCanvas.context.clearRect(0, 0, this.playerCanvas.width, this.playerCanvas.height);
    this.playerCanvas.context.fillRect(this.player.position.x, this.player.position.y, this.tutorialSpriteMap.scalar, this.tutorialSpriteMap.scalar);
  }

}

window.onload = () => new Game(document.querySelector('#app'));
