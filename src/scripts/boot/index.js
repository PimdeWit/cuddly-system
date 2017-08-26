import Canvas from '../core/ui/canvas';
import Loader from '../core/loaders/index';

class Boot {
  constructor() {
    console.log('Running %cBoot', 'color: #288bff');

    this.canvas = new Canvas('boot', 'boot', 500, 500, true);
    this.canvas.element.style.backgroundColor = 'blue';

    this.canvas.rendered.then(() => this.showLogo('../../images/1234.png'));
  }

  /**
   * @param logoPath
   * @returns {Promise.<void>}
   */
  async showLogo(logoPath) {
    const logo = await this.loadGraphics(logoPath);
    const pixelRatio = window.devicePixelRatio;

    this.canvas.context.drawImage(logo, 0, 0, logo.width / pixelRatio, logo.height / pixelRatio);

    this.canvas.hidden = false;
  }

  async loadGraphics(imagePath) {
    const loader = new Loader();
    return await createImageBitmap(await loader.load(imagePath));
  }




}

export default Boot;
