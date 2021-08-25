//Build player

console.log("My player is ready.");

const playerImg = document.createElement("img");
playerImg.src = "./images/Players/player-og.png";

class Player {
  // Player constructor and draw methods extend from Components
  constructor(canvasContext, positionX, positionY, width, height) {
    this.ctx = canvasContext;
    this.img = playerImg;
    this.x = positionX;
    this.y = positionY;
    this.width = width;
    this.height = height;
  }

  //Draw player
  draw() {
    this.ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  }

  //Flip image horizontally
  //Code here

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
