// On window load, addEventListener 'click' to start

window.addEventListener("load", function () {
  document
    .getElementById("start-button")
    .addEventListener("click", function () {
      startGame();

      console.log("My game has started!");
    });

  function startGame() {
    const newGame = new Game();
    newGame.gameInitialization();
  }
});
