// On window load, addeventlistener 'click' to start

console.log("My game has started!");

//Option 1
window.addEventListener("load", function () {
  //Get DOM states
  const gameIntroState = document.getElementById("game-intro");
  const gameState = document.getElementById("game");
  //Get game
  const newGame = new Game();
  // Get button
  const startButton = document.getElementById("start-button");
  //Add on-click event listener to start game
  startButton.addEventListener("click", function () {
    gameIntroState.style.display = "none";
    gameState.style.display = "block";

    newGame.gameStart();
  });

  //Add an event listener to move the player with the arrow keys
  //window.addEventListener("keydown", (event) => player.move(event));
});

/* //Option 2: all game logic here
window.addEventListener("load", function () {
  // Get canvas and its context
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContex("2d");
  let frameId = null;
  let obstacleId = null;

  // Get DOM states
  const gameIntroState = document.getElementById("game-intro");
  const gameState = document.getElementById("game");
  const gameOverState = document.getElementById("game-over");
  const gameWonState = document.getElementById("game-won");

  // Create instances of classes to be painted on canvas
  // Background
  const background = new Background(ctx);
  // Player
  const player = new Player(
    ctx,
    canvas.width / 2 - 25,
    canvas.height - 100,
    50,
    100
  );

  //Obstacles
  // Create Obstacles array
  const obstacleArray = [];

  //Keep score
  const score = {
    points: 0,
      };

  // Draw obstacles at set intervals
  obstacleId = setInterval(function () {
    const obstacle = new Obstacle(
      ctx,
      Math.random() * canvas.width - 200, //position x
      0, //postion y - objects will be coming from top of canvas
      Math.random() * 50 + 100, //widtth
      Math.random() * 15 + 10, //height
      Math.ceil(Math.random() * 2) //speed
    );
    obstacleArray.push(obstacle);
  }, 1500);

  //Create collision and collision check
  function checkCollision(player, obstacle) {
    const collision =
      player.x < obstacle.x + obstacle.width && //check the right side of the car
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y;

    let numberOfCollisions = 0;

    if (collision) {
      numberOfCollisions += 1;
    }

    if (numberOfCollisions > 2) {
      cancelAnimationFrame(frameId);
      clearInterval(obstacleId);
      // TO DO: substitute below for toggle of gameOverState!
      gameState.style.display = "none";
      gameOverState.style.display = "block";
    }

    //Increment  score if no collision
    if (!collision) {
      score.points += 5;
    }
  }

  // Create Game start function
  function startGame() {
    //Create a loop to animate the game
    frameId = requestAnimationFrame(startGame);
    //Check if the game is working
    console.log("The game is working, WOO!");

    //1-Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //2-Paint the object
    background.drawLoop();
    player.draw();
    // Eventually: score.draw();

    //3-Loop through the obstace array and move every obstacle
    obstacleArray.forEach((eachObstacle) => {
      eachObstacle.draw();
      eachObstacle.move();
      checkCollision(player, eachObstacle);
    });
  }

  // Get button
  const startButton = document.getElementById("start-button");
  //Add on-click event listener to start game
  startButton.addEventListener("click", function () {
    gameIntroState.style.display = "none";
    gameState.style.display = "block";
    startGame();
  });

  //Add an event listener to move the player with the arrow keys
  window.addEventListener("keydown", (event) => player.move(event));
}); */
