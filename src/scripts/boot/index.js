import Canvas from '../core/canvas/index';
import {Load} from '../core/loaders/index';

class Boot {
  constructor(logoPath) {
    console.log('Running %cBoot', 'color: #288bff');

    this.canvas = new Canvas('boot', 'boot', 500, 500, true);
    this.canvas.selectable = false;

    this.canvas.rendered.then(() => this.showLogo(logoPath));

  }

  /**
   * @param logoPath
   * @returns {Promise.<void>}
   */
  async showLogo(logoPath) {
    const logo = await this.loadGraphics(logoPath);
    const width = logo.width / 4;
    const height = logo.height / 4;

    const x = this.canvas.centerX - width / 2;
    const y = this.canvas.centerY - height / 2;

    this.canvas.context.drawImage(logo, x, y, width, height);

    this.canvas.hidden = false;
  }

  /**
   *
   * @param imagePath
   * @returns {Promise.<*>}
   */
  async loadGraphics(imagePath) {
    return await createImageBitmap(await Load(imagePath));
  }

  dispose() {
    this.canvas.dispose();
    this.canvas = null;
  }
}

export default Boot;
