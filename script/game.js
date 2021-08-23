//Create Game class
console.log("My game logic is ready.");

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.frameId = null;
    this.obstacleId = null;
    // Get DOM states
    this.gameState = document.getElementById("game");
    this.gameOverState = document.getElementById("game-over");
    this.gameWonState = document.getElementById("game-won");
    // Create instances of classes to be painted on canvas
    //Background
    this.background = new Background(this.ctx);
    // Player
    this.player = new Player(
      this.ctx,
      this.canvas.width / 2 - 25,
      this.canvas.height - 150,
      80,
      150
    );
    //Obstacles
    this.obstacleArray = [];
    this.setObstacleInterval();
    this.score = { points: 0 };
    //Collision
    //this.collision;
    this.numberOfCollisions = 0;
  }

  setObstacleInterval() {
    this.obstacleId = setInterval(() => {
      const obstacle = new Obstacle(
        this.ctx,
        Math.random() * (this.canvas.width - 200), // position x
        0, //position y - objects will be coming from top of canvas
        Math.random() * 60 + 60, //width
        Math.random() * 60 + 60, //height
        Math.ceil(Math.random() * 2) //speed
      );
      this.obstacleArray.push(obstacle);
    }, 5 * 1000);
  }

  checkCollision(player, obstacle, obstacleArray) {
    let collision =
      player.x < obstacle.x + obstacle.width && //check that the left of the player intersects the right side of the obstacle
      player.x + player.width > obstacle.x && // check that the right of the player intersects with teh left of the obstacle
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y;

    if (collision) {
      this.obstacleArray.splice(obstacle);
      this.numberOfCollisions += 1;
    }

    if (this.numberOfCollisions > 2) {
      cancelAnimationFrame(this.frameId);
      clearInterval(this.obstacleId);
      // TO DO: substitute below for toggle of gameOverState!
      this.gameState.style.display = "none";
      this.gameOverState.style.display = "block";
    }

    //Increment score if no collision
    if (!collision) {
      this.score.points += 5;
    }
  }

  gameStart() {
    //Create a loop to animate the game
    this.frameId = requestAnimationFrame(this.gameStart.bind(this));

    //1-Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //2-Paint the object
    this.background.drawLoop();
    this.player.draw();

    //3-Loop through the obstacle array and move every obstacle
    this.obstacleArray.forEach((eachObstacle) => {
      eachObstacle.draw();
      eachObstacle.move();
      this.checkCollision(this.player, eachObstacle, this.obstacleArray);
    });
  }
}
