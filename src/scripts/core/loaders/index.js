/** @private */
let _cache = {};

/**
 * Load an image, either from the cache or from
 * @param path
 * @returns {Promise}
 * @constructor
 */
export function Load(path) {
  const blob = _cache[path];

  if (blob) {
    return new Promise(resolve => resolve(blob));
  } else {
    return _fetchFile(path);
  }
}

/**
 * Remove a key and its property from the cache.
 * @param {String} key The key to remove.
 */
export function Remove(key) {
  delete _cache[key];
}

/**
 * Remove all keys and its properties from the cache.
 * @constructor
 */
export function RemoveAll() {
  _cache = {};
}

/**
 * Fetch a file and return it.
 * @param path
 * @returns {Promise}
 * @private
 */
function _fetchFile(path) {
  return new Promise((resolve, reject) => {
    fetch(path).then(response => {
      return response.blob().then(blob => {
        _cache[path] = blob.slice();
        resolve(blob);
      });
    });
  });
}
