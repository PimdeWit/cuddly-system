const LOADERS = [
  {
    constructor: ImageLoader,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },

  {
    constructor: VideoLoader,
    mimeTypes: ['video/mp4', 'video/ogg', 'video/webm'],
  },
];

class Loader {
  constructor() {
    this.loaded = [];
  }
  
  /**
   * @param {string} path 
   * @return {Promise<ImageLoader|VideoLoader>}
   */
  load(path) {

    return this._fetchFile(path);
  }

  _fetchFile(path) {
    return new Promise((resolve, reject) => {
      fetch(path).then(response => {
        return response.blob();

      }).then(blob => {
        const loader = this._getLoaderForMimeType(blob.type);

        const loaderInstance = new loader(path);

        resolve(loaderInstance);

      });

    });

  }

  _getLoaderForMimeType(mimeType) {
    for(let i = 0; i < LOADERS.length; i ++) {
      if(loaderConfig.mimeTypes.indexOf(mimeType) > -1) {
        return loaderConfig.constructor;

      }

    }

  }
}


export default Loader;