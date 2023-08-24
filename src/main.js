class GifRenderer {
  constructor(data) {
    this.element = null;
    this.imageDecoder = null;
    this.imageIndex = 0;
    this.paused = false;
    this.canvas = document.createElement("canvas");
    this.canvasContext = this.canvas.getContext("2d");
    this.init(data);
  }
  init(data) {
    if (typeof ImageDecoder == "undefined") {
      return console.error("当前浏览器不支持 ImageDecoder API，无法暂停 GIF");
    }
    if (typeof data == "undefined") {
      this.element = document.querySelector('img[src$=".gif"]');
    }
    if (typeof data == "string") {
      this.element = document.querySelector(data);
    }
    if (data instanceof HTMLElement) {
      this.element = data;
    }
    if (!this.element) {
      console.error("无法找到有效的 GIF 图像");
      return;
    }
    // 设置canvas尺寸
    this.canvas.width = this.element.naturalWidth;
    this.canvas.height = this.element.naturalHeight;
    // 实际显示尺寸
    this.canvas.style.width = this.element.clientWidth + "px";
    this.canvas.style.height = this.element.clientHeight + "px";
    this.element.after(this.canvas);
    this.element.style.position = "absolute";
    this.element.style.opacity = "0";
  }
  play() {
    this.paused = false;
    this.renderImage(this.canvas.nextResult);
  }
  pause() {
    this.paused = true;
  }
  renderImage(result) {
    this.canvasContext.drawImage(result.image, 0, 0);
    const track = this.imageDecoder.tracks.selectedTrack;
    // We check complete here since `frameCount` won't be stable until all
    if (this.imageDecoder.complete) {
      if (track.frameCount === 1) return;

      if (this.imageIndex + 1 >= track.frameCount) {
        this.imageIndex = 0;
      }
    }

    this.imageDecoder
      .decode({ frameIndex: ++this.imageIndex })
      .then((nextResult) => {
        if (this.paused === false) {
          setTimeout(() => {
            this.renderImage(nextResult);
          }, result.image.duration / 1000.0);
        } else {
          this.canvas.nextResult = nextResult;
        }
      })
      .catch((e) => {
        if (e instanceof RangeError) {
          this.imageIndex = 0;
          this.imageDecoder
            .decode({ frameIndex: this.imageIndex })
            .then(this.renderImage);
        } else {
          throw e;
        }
      });
  }
  decodeImage(imageByteStream) {
    this.imageDecoder = new ImageDecoder({
      data: imageByteStream,
      type: "image/gif",
    });
    this.imageDecoder
      .decode({ frameIndex: this.imageIndex })
      .then((result) => this.renderImage(result));
  }
  startRendering() {
    fetch(this.element.src).then((response) => this.decodeImage(response.body));
  }
}

module.exports = {
  GifRenderer
};
