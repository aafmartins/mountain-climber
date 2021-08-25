class MovingComponent {
  constructor(
    canvasContext,
    image,
    positionX,
    positionY,
    width,
    height,
    speed
  ) {
    this.ctx = canvasContext;
    this.img = image;
    this.x = positionX;
    this.y = positionY;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += this.speed;
  }
}