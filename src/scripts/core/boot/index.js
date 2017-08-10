import Startup from './modules/startup';

class Boot {
  constructor() {
    this._startup = new Startup();
  }
}

export default Boot;
