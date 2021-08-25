const bgImg = document.createElement("img");
bgImg.src = "./images/background_infinite.png";

class Background {
  constructor(canvasContext) {
    this.ctx = canvasContext;
    this.bgImgX = 0;
    this.bgImgY = 0;
    this.canvasWidth = 500;
    this.canvasHeight = 700;
    this.scrollSpeed = 0.25; //10
  }

  drawLoop() {
    //this will loop through two images infinitely
    //draw 1st img
    this.ctx.drawImage(
      bgImg,
      this.bgImgX,
      this.bgImgY,
      this.canvasWidth,
      this.canvasHeight
    );
    //draw 2nd  img
    this.ctx.drawImage(
      bgImg,
      this.bgImgX,
      this.bgImgY - this.canvasHeight,
      this.canvasWidth,
      this.canvasHeight
    );
    // update image height
    this.bgImgY += this.scrollSpeed;
    // reset the images when the first image entirely exits the screen
    if (this.bgImgY == this.canvasHeight) this.bgImgY = 0;
  }
}
