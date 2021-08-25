//Build obstacles

console.log("My obstacles are ready.");

const bonusImg = document.createElement("img");
bonusImg.src = "./images/helmet.png";

class Bonus {
  // Obstacle constructor and draw methods extend from Components
  constructor(canvasContext, positionX, positionY, width, height, speed) {
    this.ctx = canvasContext;
    this.img = bonusImg;
    this.x = positionX;
    this.y = positionY;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  //Draw object
  draw() {
    this.ctx.drawImage(bonusImg, this.x, this.y, this.width, this.height);
  }

  // Add move method
  move() {
    this.y += this.speed;
  }
}
