const _cache = {};

export function Load(path) {
  const blob = _cache[path];

  if (blob) {
    return new Promise(resolve => resolve(blob));
  } else {
    return _fetchFile(path);
  }
}

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