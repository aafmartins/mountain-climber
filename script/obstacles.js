//Build obstacles

console.log("My obstacles are ready.");

const obsImg = document.createElement("img");
obsImg.src = "/images/Obstacles/rock-L.png";

class Obstacle {
  // Obstacle constructor and draw methods extend from Components
  constructor(canvasContext, positionX, positionY, width, height, speed) {
    this.ctx = canvasContext;
    this.img = obsImg;
    this.x = positionX;
    this.y = positionY;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  //Draw object
  draw() {
    this.ctx.drawImage(obsImg, this.x, this.y, this.width, this.height);
  }

  // Add move method
  move() {
    this.y += this.speed;
  }
}
