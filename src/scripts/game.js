import Entity from './core/2d/entities/index';
import SpriteMap from './core/spritemap/index';
import Canvas from './core/canvas/index';
import KeyboardManager from './core/input/keyboard';
import * as loader from './core/loaders/index';

export let SHELL = null;
export let SCALE = null;
export let ACTIVE_MAP = null;
export let PATHS = {};

export class Game {
  static get activeMap() {
    return ACTIVE_MAP;
  }

  constructor(shell) {
    SHELL = shell;
    PATHS.ASSETS = '../../images/';
    SCALE = window.devicePixelRatio;

    this.world = {};

    this._initialise().then(this.render.bind(this));
  }

  async _initialise() {
    const mapTexture = await loader.load('../../images/map-debug_16x16.png');
    const sprites = await loader.loadBatch([
      `${PATHS.ASSETS}debug/debug_blue.png`,
      `${PATHS.ASSETS}debug/debug_red.png`,
      `${PATHS.ASSETS}debug/debug_yellow.png`
    ]);
    let sprite = null;

    this.player = {
      entity: new Entity('player'),
      canvas: new Canvas('player')
    };

    this.world.tutorial = {};
    this.world.tutorial.canvas = new Canvas('tutorial');
    this.world.tutorial.spriteMap = new SpriteMap(this.world.tutorial.canvas, mapTexture);

    await this.world.tutorial.spriteMap.generateMap();

    this.world.tutorial.spriteMap.tiles.forEach(tile => {
      if (tile.colors.r === 255) sprite = sprites[0];
      if (tile.colors.r === 128) sprite = sprites[1];
      if (tile.colors.r === 159) sprite = sprites[2];
      if (tile.colors.r === 48) sprite = sprites[2];

      if (sprite) this.world.tutorial.canvas.context.drawImage(sprite, tile.x, tile.y, tile.width, tile.height);
    });

    this.player.canvas.context.fillStyle = 'white';
    this.player.entity.position = {
      x: this.world.tutorial.spriteMap.scalar,
      y: this.world.tutorial.spriteMap.scalar
    };

    // this.keyboard = new KeyboardManager();
    // this.keyboard.listen();

    ACTIVE_MAP = this.world.tutorial;
  }

  render() {

    requestAnimationFrame(this.render.bind(this));

    // if (this.keyboard.activeKey) {
    //   console.log(this.keyboard.activeKey);
    //
    //   if (this.keyboard.activeKey === (38 || 76)) this.player.entity.position.y -= this.world.tutorial.spriteMap.scalar;
    //   if (this.keyboard.activeKey === (39 || 68)) this.player.entity.position.x += this.world.tutorial.spriteMap.scalar;
    //   if (this.keyboard.activeKey === (40 || 83)) this.player.entity.position.y += this.world.tutorial.spriteMap.scalar;
    //   if (this.keyboard.activeKey === (37 || 65)) this.player.entity.position.x -= this.world.tutorial.spriteMap.scalar;
    //
    // }

    this.player.canvas.context.clearRect(0, 0, this.player.canvas.width, this.player.canvas.height);
    this.player.canvas.context.fillRect(
        this.player.entity.position.x,
        this.player.entity.position.y,
        this.world.tutorial.spriteMap.scalar,
        this.world.tutorial.spriteMap.scalar);

  }

}
