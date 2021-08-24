//Create Game class
console.log("My game logic is ready.");

class Game {
  constructor() {
    //Get Canvas and its context
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.frameId = null;
    this.obstacleId = null;
    // Get DOM states
    this.gameIntroState = document.getElementById("game-intro");
    this.gameState = document.getElementById("game");
    this.gameOverState = document.getElementById("game-over");
    this.gameWonState = document.getElementById("game-won");
    // Create instances of classes to be painted on canvas
    this.background = new Background(this.ctx);
    this.player = new Player(
      this.ctx,
      this.canvas.width / 2 - 25,
      this.canvas.height - 150,
      80,
      150
    );
    this.obstacleArray = [];
    this.score = {
      points: 0,
    };
    this.numberOfCollisions = 0;
  }

  setObstacleInterval() {
    this.obstacleId = setInterval(() => {
      const obstacle = new Obstacle(
        this.ctx,
        Math.random() * this.canvas.width, // position x
        0, //position y - objects will be coming from top of canvas
        Math.random() * 40 + 40, //width
        Math.random() * 40 + 40, //height
        Math.ceil(Math.random() * 2) //speed
      );
      this.obstacleArray.push(obstacle);
    }, 2 * 1000);
  }

  checkCollision() {
    let collision =
      this.player.x < this.obstacle.x + this.obstacle.width && //check that the left of the player intersects the right side of the obstacle
      this.player.x + this.player.width > this.obstacle.x && // check that the right of the player intersects with teh left of the obstacle
      this.player.y < this.obstacle.y + this.obstacle.height &&
      this.player.y + this.player.height > this.obstacle.y;

    if (collision) {
      this.obstacleArray.splice(this.obstacle, 1);
      this.numberOfCollisions += 1;
      this.score.points -= 5;
    }

    if (this.numberOfCollisions > 2) {
      cancelAnimationFrame(this.frameId);
      clearInterval(this.obstacleId);
      this.gameState.style.display = "none";
      this.gameOverState.style.display = "block";
    }
  }

  checkAvoidedCollisions() {
    let avoidedCollision = this.obstacle.y > this.canvas.height;

    if (avoidedCollision) {
      this.obstacleArray.splice(this.obstacle, 1);
      this.score.points += 5;
    }

    if (this.score.points > 100) {
      cancelAnimationFrame(this.frameId);
      clearInterval(this.obstacleId);
      this.gameState.style.display = "none";
      this.gameWonState.style.display = "block";
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
    for (this.obstacle of this.obstacleArray) {
      this.obstacle.draw();
      this.obstacle.move();
      this.checkCollision();
      this.checkAvoidedCollisions();
    }
  }

  gameInitialization() {
    this.gameIntroState.style.display = "none";
    this.gameState.style.display = "block";
    this.gameStart();
    this.setObstacleInterval();
    //Add an event listener to move the player with the arrow keys
    window.addEventListener("keydown", (event) => this.player.move(event));
  }
}
