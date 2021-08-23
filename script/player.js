//Build player

class Player extends Components {
  // Player constructor and draw methods extend from Components
  constructor(canvasContext, image, positionX, positionY, width, height) {
    super(canvasContext, image, positionX, positionY, width, height);
  }

  // Add move method
  move(event) {
    switch (event.keyCode) {
      case 37:
        if (this.x > 0) this.x -= 15;
        break;

      case 39:
        if (this.x < canvas.width - this.width) this.x += 15;
        break;

      default:
        break;
    }
  }
}
