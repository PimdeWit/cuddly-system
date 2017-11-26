import Entity from './core/2d/entities/index';
import SpriteMap from './core/spritemap/index';
import Canvas from './core/canvas/index';
import Scene from './core/scene/index';
import KeyboardManager from './core/input/keyboard';
import PhysicsLayer from './core/physics/physicslayer.js';
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

    this._initialise().then(() => {

      // setInterval(() => {
      //   this.render();
      // }, 1000 / 10);
    });
  }

  async _initialise() {
    const mapTexture = await loader.load('../../images/map-debug_16x16.png');
    const sprites = await loader.loadBatch([
      `${PATHS.ASSETS}debug/debug_blue.png`,
      `${PATHS.ASSETS}debug/debug_red.png`,
      `${PATHS.ASSETS}debug/debug_yellow.png`
    ]);
    let sprite = null;

    this.tutorial = new Scene('tutorial', mapTexture, sprites);
    await this.tutorial.setup();
    await this.tutorial.createPhysicsLayer();

    // TODO: refactor to Scene.addEntity();
    this.tutorial.player = {};
    this.tutorial.player.entity = new Entity('player');
    this.tutorial.player.canvas = new Canvas('player');
    this.tutorial.player.canvas.context.fillStyle = 'white';
    this.tutorial.player.entity.position.x = this.tutorial._map.scalar;
    this.tutorial.player.entity.position.y = this.tutorial._map.scalar;
    //
    this.keyboard = new KeyboardManager();
    this.keyboard.listen();
    //
    // ACTIVE_MAP = this.tutorial;


  }

  render() {
    const player = this.tutorial.player;
    const key = this.keyboard.activeKey;

    const newPosition = Object.assign({}, player.entity.position);

    if (key) {
      console.log(this.keyboard.activeKey);

      if (key === 38 || key === 87) newPosition.y -= this.tutorial._map.scalar;
      if (key === 39 || key === 68) newPosition.x += this.tutorial._map.scalar;
      if (key === 40 || key === 83) newPosition.y += this.tutorial._map.scalar;
      if (key === 37 || key === 65) newPosition.x -= this.tutorial._map.scalar;
    }

    const collidedTile = this.tutorial.collidableLayer.tiles.find(tile => {
      return newPosition.x >= tile.x && newPosition.x < tile.x + tile.width &&
          newPosition.y >= tile.y && newPosition.y < tile.y + tile.height;
    });

    if (typeof collidedTile === 'undefined') {
      player.entity.position.x = newPosition.x;
      player.entity.position.y = newPosition.y;
    }

    player.canvas.context.clearRect(0, 0, player.canvas.width * 2, player.canvas.height * 2);
    player.canvas.context.fillRect(
        player.entity.position.x,
        player.entity.position.y,
        this.tutorial.spriteMap.scalar,
        this.tutorial.spriteMap.scalar);

    // requestAnimationFrame(this.render.bind(this));
  }
}
