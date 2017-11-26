import Canvas from '../canvas/index';
import SpriteMap from '../spritemap/index';
import PhysicsLayer from '../physics/physicslayer';

class Scene {
  /**
   *
   * @param {String} id
   */
  constructor(id, mapTexture, sprites) {
    this._id = id;
    this._canvas = new Canvas(id);

    this._map = new SpriteMap(this._canvas, mapTexture);

    this._sprites = sprites;

    this._entities = {};

    this._collisionLayer = null;
  }

  async setup() {
    await this._map.generateMap();

    let sprite = null;

    this._map.tiles.forEach(tile => {
      if (tile.colors[0] === 255) sprite = this._sprites[0];
      if (tile.colors[0] === 128) {
        sprite = this._sprites[1];
      }
      if (tile.colors[0] === 159) sprite = this._sprites[2];
      if (tile.colors[0] === 48) sprite = this._sprites[2];

      if (tile.colors[0] === 3) {
        sprite = this._sprites[2];
      }

      if (sprite) this._canvas.context.drawImage(sprite, tile.x, tile.y, tile.width, tile.height);
    });
  }

  /**
   * @todo Change logic based on JSON "collision" flag.
   * @returns {Promise.}
   */
  createPhysicsLayer() {
    const tiles = [];

    this._map.tiles.forEach(tile => {
      if (tile.colors[0] === 128) tiles.push(tile);
    });

    this._collisionLayer = new PhysicsLayer(tiles, true);
  }

  addEntity(entity) {
    this._entities.push(entity);
  }
}

export default Scene;
