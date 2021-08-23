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
    this.score = {
      points: 0,
    };
    //Collision
    this.collision;
    this.numberOfCollisions = 0;
  }

  setObstacleInterval() {
    this.obstacleId = setInterval( () => {
      const obstacle = new Obstacle(
        this.ctx,
        Math.random() * this.canvas.width - 100, // position x
        0, //position y - objects will be coming from top of canvas
        Math.random() * 60 + 60, //width
        Math.random() * 60 + 60, //height
        Math.ceil(Math.random() * 2) //speed
      );
      this.obstacleArray.push(obstacle);
    }, 1500);
  }

  checkCollision() {
    this.collision =
      this.player.x < this.obstacle.x + this.obstacle.width && //check the right side of the car
      this.player.x + this.player.width > this.obstacle.x &&
      this.player.y < this.obstacle.y + this.obstacle.height &&
      this.player.y + this.player.height > this.obstacle.y;

    if (this.collision) {
      this.numberOfCollisions += 1;
    }

    if (this.numberOfCollisions > 2) {
      cancelAnimationFrame(this.frameId);
      clearInterval(this.obstacleId);
      // TO DO: substitute below for toggle of gameOverState!
      this.gameState.style.display = "none";
      this.gameOverState.style.display = "block";
    }

    //Increment  score if no collision
    if (!this.collision) {
      this.score.points += 5;
    }
  }

  gameStart() {
    //Create a loop to animate the game
    this.frameId = requestAnimationFrame(this.gameStart.bind(this));
    //Check if the game is working
    console.log("The game is working, WOO!");

    //1-Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //2-Paint the object
    this.background.drawLoop();
    this.player.draw();

    this.setObstacleInterval();

    //3-Loop through the obstacle array and move every obstacle
    this.obstacleArray.forEach((eachObstacle) => {
      console.log('where are my obstacles')
      eachObstacle.draw();
      eachObstacle.move();
      this.checkCollision(this.player, eachObstacle);
    });
  }
}
