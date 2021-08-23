// Build game components factory

class Components {
  constructor(canvasContext, image, positionX, positionY, width, height) {
    this.ctx = canvasContext;
    this.img = image;
    this.x = positionX;
    this.y = positionY;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
