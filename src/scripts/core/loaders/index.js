const LOADERS = [
  {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp']
  },

  {
    mimeTypes: ['video/mp4', 'video/ogg', 'video/webm']
  },
];

class Loader {
  constructor() {
    this._cache = {};
    this._pendingPromises = {};
  }


  /**
   * @param {string} path
   * @return {Promise<ImageLoader|VideoLoader>}
   */
  load(path) {
    const blob = this._cache[path];

    if (blob) {
      return new Promise(resolve => resolve(blob));
    } else {
      return this._fetchFile(path);
    }

  }


  _fetchFile(path) {
    const promise = new Promise((resolve, reject) => {
      fetch(path).then(response => {
        return response.blob().then(blob => {
          this._cache[path] = blob.slice();

          resolve(blob)
        });
      });
    });

    this._pendingPromises[path] = this._pendingPromises[path] || [];

    this._pendingPromises[path].push(promise);

    return promise;

  }
}

export default Loader;

const loader = new Loader();
export {
  loader,
};
