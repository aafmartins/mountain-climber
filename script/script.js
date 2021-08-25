// On window load, addEventListener 'click' to start

window.addEventListener("load", function () {
  document
    .getElementById("start-button")
    .addEventListener("click", function (event) {
      event.preventDefault();
      startGame();
    });

  document
    .getElementById("restart-button-go")
    .addEventListener("click", function (event) {
      event.preventDefault();
      startGame();
    });

  document
    .getElementById("restart-button-gw")
    .addEventListener("click", function (event) {
      event.preventDefault();
      startGame();
    });

  function startGame() {
    const newGame = new Game();
    newGame.gameInitialization();
  }
});
