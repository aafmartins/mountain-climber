//Create Game class
console.log("My game logic is ready.");

class Game {
  constructor() {
    //Get Canvas and its context
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.frameId = null;
    this.obstacleId = null;
    this.bonusId = null;
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
    //Get Bonus elements
    this.bonusArray = [];
    this.bonusPoints = {
      points: 0,
    };
    //Get sounds
    this.ouchSound = new Audio(
      "/audio/377560__yudena__argh-woman-bymondfisch89.ogg"
    );
    this.catchSound = new Audio("/audio/387232__steaq__badge-coin-win.wav");
    this.winSound = new Audio(
      "/audio/270402__littlerobotsoundfactory__jingle-win-00.wav"
    );
    this.gameOverAudio = new Audio(
      "/audio/173859__jivatma07__j1game-over-mono.wav"
    );
    this.backgroundSound = new Audio(
      "/audio/564912__bloodpixelhero__funny-background-music-2.wav"
    );
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
      this.ouchSound.play();
      this.numberOfCollisions++;
      //decrement score
      this.score.points -= 5;
      //remove bonus points
      if (this.bonusPoints.points > 0) {
        this.bonusPoints.points--;
      }
    }

    //Game-over logic
    if (this.numberOfCollisions > 2 && this.bonusPoints.points < 1) {
      this.backgroundSound.stop();
      cancelAnimationFrame(this.frameId);
      clearInterval(this.obstacleId);
      this.gameOverAudio.play();
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

    //Game-win logic
    if (this.score.points > 100) {
      this.backgroundSound.stop();
      cancelAnimationFrame(this.frameId);
      clearInterval(this.obstacleId);
      this.winSound.play();
      this.gameState.style.display = "none";
      this.gameWonState.style.display = "block";
    }
  }

  setBonusInterval() {
    this.bonusId = setInterval(() => {
      const bonusElement = new Bonus(
        this.ctx,
        Math.random() * this.canvas.width, // position x
        0, //position y - objects will be coming from top of canvas
        40, //width
        40, //height
        Math.ceil(Math.random() * 2) //speed
      );
      this.bonusArray.push(bonusElement);
    }, 3 * 1000);
  }

  checkCatches() {
    let caught =
      this.player.x < this.bonus.x + this.bonus.width && //check that the left of the player intersects the right side of the obstacle
      this.player.x + this.player.width > this.bonus.x && // check that the right of the player intersects with teh left of the obstacle
      this.player.y < this.bonus.y + this.bonus.height &&
      this.player.y + this.player.height > this.bonus.y;

    if (caught) {
      this.bonusArray.splice(this.bonus, 1);
      this.catchSound.play();
      //increment bonus points
      this.bonusPoints.points++;
      console.log(this.bonusPoints.points);
      //increment score points
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

    //3-Loop through the bonus array and move every bonus element
    for (this.bonus of this.bonusArray) {
      this.bonus.draw();
      this.bonus.move();
      this.checkCatches();
    }

    //4-Loop through the obstacle array and move every obstacle
    for (this.obstacle of this.obstacleArray) {
      this.obstacle.draw();
      this.obstacle.move();
      this.checkCollision();
      this.checkAvoidedCollisions();
    }
  }

  gameInitialization() {
    this.gameIntroState.style.display = "none";
    this.gameOverState.style.display = "none";
    this.gameWonState.style.display = "none";
    this.gameState.style.display = "block";
    this.gameStart();
    this.setObstacleInterval();
    this.setBonusInterval();
    this.backgroundSound.play();
    //Add an event listener to move the player with the arrow keys
    window.addEventListener("keydown", (event) => this.player.move(event));
  }
}
