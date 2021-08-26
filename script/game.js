class Game {
  constructor() {
    // Get Canvas and its context
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    // Get canvas size
    this.canvas.height = window.innerHeight * 0.9;
    this.canvas.width = (500 / 700) * this.canvas.height;
    // Get DOM states
    this.gameIntroState = document.getElementById("game-intro");
    this.gameState = document.getElementById("game");
    this.gameOverState = document.getElementById("game-over");
    this.gameWonState = document.getElementById("game-won");
    // Create instances of classes to be painted on canvas
    this.background = new Background(
      this.ctx,
      this.canvas.width,
      this.canvas.height
    );
    this.player = new Player(
      this.ctx,
      this.canvas.width / 2 - ((80 / 500) * this.canvas.width) / 2,
      this.canvas.height - (150 / 700) * this.canvas.height,
      (80 / 500) * this.canvas.width,
      (150 / 700) * this.canvas.height
    );
    //Create other needed variables
    this.playerName = document.getElementById("name").value;
    this.scoreGO = document.getElementById("score-go");
    this.scoreGW = document.getElementById("score-gw");
    this.gameWinMsg = document.getElementById("win-message");
    this.gameOverMsg = document.getElementById("go-message");
    this.firstPlaceGO = document.getElementById("first-place-go");
    this.secondPlaceGO = document.getElementById("second-place-go");
    this.thirdPlaceGW = document.getElementById("third-place-go");
    this.firstPlaceGW = document.getElementById("first-place-gw");
    this.secondPlaceGW = document.getElementById("second-place-gw");
    this.thirdPlaceGO = document.getElementById("third-place-gw");
    this.frameId = null;
    this.obstacleId = null;
    this.bonusId = null;
    this.obstacleArray = [];
    this.score = 0;
    this.numberOfCollisions = 0;
    this.numberOfAvoidedCollisions = 0;
    this.bonusArray = [];
    this.bonusPoints = 0;
    this.highScores = [];
    //Access local storage
    this.localHighScores = JSON.parse(localStorage.getItem("highScores"));
    if (this.localHighScores !== null) {
      this.highScores = this.localHighScores;
    }
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
        Math.abs(Math.random() * this.canvas.width - 100), // position x
        0, //position y - objects will be coming from top of canvas
        Math.random() * (40 / 500) * this.canvas.width +
          (40 / 500) * this.canvas.width, //width
        Math.random() * (40 / 500) * this.canvas.width +
          (40 / 500) * this.canvas.width, //height
        Math.ceil(Math.random() * 2) //speed
      );
      this.obstacleArray.push(obstacle);
    }, 2 * 1000);
  }

  setBonusInterval() {
    const bonusImg = document.createElement("img");
    bonusImg.src = "./images/helmet.png";
    this.bonusId = setInterval(() => {
      const bonusElement = new MovingComponent(
        this.ctx,
        bonusImg,
        Math.abs(Math.random() * this.canvas.width - 100),
        0,
        (40 / 500) * this.canvas.width,
        (40 / 700) * this.canvas.height,
        Math.ceil(Math.random() * 1)
      );
      this.bonusArray.push(bonusElement);
    }, 4 * 1000);
  }

  checkCollision(obstacle) {
    let collision =
      this.player.x < obstacle.x + obstacle.width &&
      this.player.x + this.player.width > obstacle.x &&
      this.player.y < obstacle.y + obstacle.height &&
      this.player.y + this.player.height > obstacle.y;

    if (collision) {
      this.obstacleArray.splice(this.obstacleArray.indexOf(obstacle), 1);
      this.ouchSound.play();
      this.numberOfCollisions++;
      this.score -= 5;
      if (this.bonusPoints > 0) {
        this.bonusPoints--;
      }
    }
  }

  checkAvoidedCollisions(obstacle) {
    let avoidedCollision = obstacle.y > this.canvas.height;

    if (avoidedCollision) {
      this.obstacleArray.splice(this.obstacleArray.indexOf(obstacle), 1);
      this.numberOfAvoidedCollisions++;
      this.score += 5;
    }
  }

  checkCatches(bonus) {
    let caught =
      this.player.x < bonus.x + bonus.width &&
      this.player.x + this.player.width > bonus.x &&
      this.player.y < bonus.y + bonus.height &&
      this.player.y + this.player.height > bonus.y;

    if (caught) {
      this.bonusArray.splice(this.bonusArray.indexOf(bonus), 1);
      this.catchSound.play();
      this.bonusPoints++;
      this.score += 5;
    }
  }

  //EASTER EGG
  //Create cheat action
  help() {
    this.canvas.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.score++;
    });
  }

  //Check correct cheat code
  askForHelp() {
    const pressed = [];
    const helpCode = "help";
    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      pressed.push(e.key);
      pressed.splice(-helpCode.length - 1, pressed.length - helpCode.length);

      if (pressed.join("").includes(helpCode)) {
        this.help();
      }
    });
  }

  // Update highscores
  updateHighScores(playerName, playerScore) {
    if (this.highScores.length < 3) {
      this.highScores.push({ name: playerName, score: playerScore });
    } else {
      //Find lowest score in the highScores array
      let minPlayerScore;
      for (let i = 0; i < this.highScores.length; i++) {
        if (minPlayerScore == null) {
          minPlayerScore = this.highScores[i];
        }
        if (this.highScores[i].score < minPlayerScore.score) {
          minPlayerScore = this.highScores[i];
        }
      }
      //Compare lowest score with new score
      if (playerScore > minPlayerScore.score) {
        //If new score is higher, splice lowest score and add new score to the highScores array
        this.highScores.splice(this.highScores.indexOf(minPlayerScore), 1, {
          name: playerName,
          score: playerScore,
        });
      }
    }
    //Save highScores array to local storage
    localStorage.setItem("highScores", JSON.stringify(this.highScores));
  }

  drawHighScores() {
    let orderedScores = this.highScores.sort((a, b) => {
      return b.score - a.score;
    });

    if (orderedScores[0]) {
      this.firstPlaceGO.innerText = `${orderedScores[0].name} ... ${orderedScores[0].score}`;
      this.firstPlaceGW.innerText = `${orderedScores[0].name} ... ${orderedScores[0].score}`;
    }
    if (orderedScores[1]) {
      this.secondPlaceGO.innerText = `${orderedScores[1].name} ... ${orderedScores[1].score}`;
      this.secondPlaceGW.innerText = `${orderedScores[1].name} ... ${orderedScores[1].score}`;
    }
    if (orderedScores[2]) {
      this.thirdPlaceGO.innerText = `${orderedScores[2].name} ... ${orderedScores[2].score}`;
      this.thirdPlaceGW.innerText = `${orderedScores[2].name} ... ${orderedScores[2].score}`;
    }
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
    if (this.numberOfCollisions > 0 && this.bonusPoints < 1) {
      this.backgroundSound.stop();
      this.updateHighScores(this.playerName, this.score);
      cancelAnimationFrame(this.frameId);
      clearInterval(this.obstacleId);
      clearInterval(this.bonusId);
      this.gameOverAudio.play();
      if (this.playerName) {
        this.gameOverMsg.innerText = `Game over, ${this.playerName}!`;
      }
      this.scoreGO.innerText = `Your score is ${this.score}`;
      this.drawHighScores();
      this.gameState.style.display = "none";
      this.gameOverState.style.display = "block";
    }
  }

  checkGameWin() {
    if (this.numberOfAvoidedCollisions > 10) {
      this.backgroundSound.stop();
      this.updateHighScores(this.playerName, this.score);
      cancelAnimationFrame(this.frameId);
      clearInterval(this.obstacleId);
      clearInterval(this.bonusId);
      this.winSound.play();
      if (this.playerName) {
        this.gameWinMsg.innerText = `${this.playerName}, you won!`;
      }
      this.scoreGW.innerText = `Your score is ${this.score}`;
      this.drawHighScores();
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
    const heyMsg = document.getElementById("hey");
    if (this.playerName) {
      heyMsg.innerText = `Hey, ${this.playerName}! Let's see how your climb is going:`;
    }
    this.gameIntroState.style.display = "none";
    this.gameOverState.style.display = "none";
    this.gameWonState.style.display = "none";
    this.gameState.style.display = "block";
    this.gameStart();
    this.setObstacleInterval();
    this.setBonusInterval();
    this.backgroundSound.play();
    this.askForHelp();
    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      this.player.move(e);
    });
  }
}
