const IMAGE_EXTENSIONS = ['jpg', 'png', 'webp'];
const VIDEO_EXTENSIONS = ['mp4', 'ogg', 'webm'];

class Loader {
	constructor(parameters) {
    this.loaded = [];

    this.extensionChecker = new RegExp(/\.[0-9a-z]+$/i);
  }
  
  load(path) {

    this._fetchFile(path);
  }

  _fetchFile(path) {
    fetch(path).then(response => {
      return response.blob();
    }).then(blob => {
      this._checkFileType(blob.type);
    })
  }

  _checkFileType(type) {
    console.log(type);
    console.log(type.match(this.extensionChecker));
  
    for (var i = IMAGE_EXTENSIONS.length - 1; i >= 0; i--) {
    }

    for (var i = VIDEO_EXTENSIONS.length - 1; i >= 0; i--) {
    }
  }
}


export default Loader;
