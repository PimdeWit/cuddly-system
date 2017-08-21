import UI from '../index';
import Loader from '../../loaders/index';

class Splash extends UI {
  constructor(assets) {
    super();

    this.loader = new Loader();

    assets.forEach(asset => {
      this.loader.load(asset);
    });
  }
}

export default Splash;