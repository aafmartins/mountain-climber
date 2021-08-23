//Build obstacles


class Obstacles extends Components {
  // Obstacle constructor and draw methods extend from Components
  constructor(
    canvasContext,
    image,
    positionX,
    positionY,
    width,
    height,
    speed
  ) {
    super(canvasContext, image, positionX, positionY, width, height);
    //Add speed
    this.speed = speed;
  }

  // Add move method
  move() {
    this.y += this.speed;
  }
}
