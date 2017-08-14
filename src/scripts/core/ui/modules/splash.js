import UI from '../index';
import Loader from '../../loaders/index';

class Splash extends UI {
  constructor(assets) {
    super();

    this.loader = new Loader();
    this.loadedAssets = [];

    this.loadAssets(assets).then(() => {
      console.log('we did it');
    })
  }

  loadAssets(assets) {
    const assetCount = assets.length;
    let currentIteration = 0;

    assets.forEach(asset => {
      this.loader.load(asset).then(loadedAsset => {
        this.loadedAssets.push(loadedAsset);
        currentIteration++;
        // ???
      });
    });
  }

  showImages() {
    const image = new Image();
    image.src = loadedAsset;
    document.body.appendChild(image);
  }
}

export default Splash;