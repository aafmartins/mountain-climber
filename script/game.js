class Game {
  constructor() {
    //Get Canvas and its context
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
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
    //Create other needed variables
    this.frameId = null;
    this.obstacleId = null;
    this.bonusId = null;
    this.obstacleArray = [];
    this.score = 0;
    this.numberOfCollisions = 0;
    this.bonusArray = [];
    this.bonusPoints = 0;
    //Get sounds
    this.ouchSound = new Audio(
      "./audio/377560__yudena__argh-woman-bymondfisch89.ogg"
    );
    this.catchSound = new Audio("./audio/387232__steaq__badge-coin-win.wav");
    this.winSound = new Audio(
      "./audio/270402__littlerobotsoundfactory__jingle-win-00.wav"
    );
    this.gameOverAudio = new Audio(
      "./audio/173859__jivatma07__j1game-over-mono.wav"
    );
    this.backgroundSound = new Audio(
      "./audio/564912__bloodpixelhero__funny-background-music-2.wav"
    );
  }

  setObstacleInterval() {
    const obsImg = document.createElement("img");
    obsImg.src = "./images/Obstacles/rock-L.png";
    this.obstacleId = setInterval(() => {
      const obstacle = new MovingComponent(
        this.ctx,
        obsImg,
        Math.random() * this.canvas.width - 100, // position x
        0, //position y - objects will be coming from top of canvas
        Math.random() * 40 + 40, //width
        Math.random() * 40 + 40, //height
        Math.ceil(Math.random() * 2) //speed
      );
      this.obstacleArray.push(obstacle);
    }, 3 * 1000);
  }

  setBonusInterval() {
    const bonusImg = document.createElement("img");
    bonusImg.src = "./images/helmet.png";
    this.bonusId = setInterval(() => {
      const bonusElement = new MovingComponent(
        this.ctx,
        bonusImg,
        Math.random() * this.canvas.width - 100, // position x
        0, //position y - objects will be coming from top of canvas
        40, //width
        40, //height
        Math.ceil(Math.random() * 1) //speed
      );
      this.bonusArray.push(bonusElement);
    }, 3 * 1000);
  }

  checkCollision(obstacle) {
    let collision =
      this.player.x < obstacle.x + obstacle.width && //check that the left of the player intersects the right side of the obstacle
      this.player.x + this.player.width > obstacle.x && // check that the right of the player intersects with teh left of the obstacle
      this.player.y < obstacle.y + obstacle.height &&
      this.player.y + this.player.height > obstacle.y;

    if (collision) {
      this.obstacleArray.splice(obstacle, 1);
      this.ouchSound.play();
      this.numberOfCollisions++;
      //decrement score
      this.score -= 5;
      //remove bonus points
      if (this.bonusPoints > 0) {
        this.bonusPoints--;
      }
    }
  }

  checkAvoidedCollisions(obstacle) {
    let avoidedCollision = obstacle.y > this.canvas.height;

    if (avoidedCollision) {
      this.obstacleArray.splice(obstacle, 1);
      this.score += 5;
    }
  }

  checkCatches(bonus) {
    let caught =
      this.player.x < bonus.x + bonus.width && //check that the left of the player intersects the right side of the obstacle
      this.player.x + this.player.width > bonus.x && // check that the right of the player intersects with teh left of the obstacle
      this.player.y < bonus.y + bonus.height &&
      this.player.y + this.player.height > bonus.y;

    if (caught) {
      this.bonusArray.splice(bonus, 1);
      this.catchSound.play();
      //increment bonus points
      this.bonusPoints++;
      //increment score points
      this.score += 5;
    }
  }

  //EASTER EGG

  //Create cheat action
  help() {
    this.canvas.addEventListener("mousedown", () => this.score++);
  }

  //Check correct cheat code
  askForHelp() {
    const pressed = [];
    const helpCode = "help";
    window.addEventListener("keyup", (e) => {
      pressed.push(e.key);
      pressed.splice(-helpCode.length - 1, pressed.length - helpCode.length);

      if (pressed.join("").includes(helpCode)) {
        this.help();
      }
    });
  }

  drawScore() {
    const score = document.getElementById("add-score");
    score.innerText = `${this.score}`;
  }

  drawBonusPoints() {
    const health = document.getElementById("add-health");
    health.innerText = `${this.bonusPoints}`;
  }

  checkGameOver() {
    if (this.numberOfCollisions > 2 && this.bonusPoints < 1) {
      this.backgroundSound.stop();
      cancelAnimationFrame(this.frameId);
      clearInterval(this.obstacleId);
      this.gameOverAudio.play();
      this.gameState.style.display = "none";
      this.gameOverState.style.display = "block";
    }
  }

  checkGameWin() {
    if (this.score > 100) {
      this.backgroundSound.stop();
      cancelAnimationFrame(this.frameId);
      clearInterval(this.obstacleId);
      this.winSound.play();
      this.gameState.style.display = "none";
      this.gameWonState.style.display = "block";
    }
  }

  gameStart() {
    //Create a loop to animate the game
    this.frameId = requestAnimationFrame(this.gameStart.bind(this));

    //1-Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //2-Paint the objects
    this.background.drawLoop();
    this.player.draw();
    this.drawScore();
    this.drawBonusPoints();

    //3-Loop through the bonus array and move every bonus element from end to beginning
    for (let i = this.bonusArray.length - 1; i >= 0; i--) {
      this.bonusArray[i].draw();
      this.bonusArray[i].move();
      this.checkCatches(this.bonusArray[i]);
    }

    //4-Loop through the obstacle array and move every obstacle from end to beginning
    for (let i = this.obstacleArray.length - 1; i >= 0; i--) {
      this.obstacleArray[i].draw();
      this.obstacleArray[i].move();
      this.checkCollision(this.obstacleArray[i]);
      this.checkAvoidedCollisions(this.obstacleArray[i]);
    }

    //5-Check game-over and game-won conditions
    this.checkGameWin();
    this.checkGameOver();
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
    this.askForHelp();
    window.addEventListener("keydown", (event) => this.player.move(event));
  }
}
