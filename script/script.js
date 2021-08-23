// On window load, addeventlistener 'click' to start

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
    console.log("My game has started!");
  });

  //Add an event listener to move the player with the arrow keys
  window.addEventListener("keydown", (event) => newGame.player.move(event));
});
