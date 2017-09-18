class EffectLayer {
  /**
   * @param {Canvas} canvas
   */
  constructor(canvas) {
    /** @type {Boolean} */
    this._draw = false;

    this.canvas = canvas;
    this.canvasImage = this.canvas.domElement;
    this._time = 0;

    this.columns = 8;
  }

  /** @returns {Boolean} */
  get drawing() {
    return this._drawing;
  }

  set drawing(value) {
    this._drawing = value;

    if (this._drawing) this._render();
  }

  _render() {
    if (this.drawing) requestAnimationFrame(this._render.bind(this));
    this._time++;

    // this.canvas.context.fillStyle = '#1a1a1a';
    // this.canvas.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.context.drawImage(this.canvas.domElement, 0, 0, 10 + this._time, 1000);

    for (let i = this.columns - 1; i >= 0; i--) {
      const distance = this.columns[i] * 100;

      this.canvas.context.save();

      this.canvas.context.drawImage(this.canvas.domElement, 0, 0, 10 + this._time, 1000);
      this.canvas.context.restore();
    }

  }
}

export default EffectLayer;
