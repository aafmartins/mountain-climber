// On window load, addEventListener 'click' to start

window.addEventListener("load", function () {
  document
    .getElementById("start-button")
    .addEventListener("click", function () {
      startGame();

      console.log("My game has started!");
    });

  document
    .getElementById("restart-button-go")
    .addEventListener("click", function () {
      startGame();

      console.log("My game has restarted!");
    });

  document
    .getElementById("restart-button-gw")
    .addEventListener("click", function () {
      startGame();

      console.log("My game has restarted!");
    });

  function startGame() {
    const newGame = new Game();
    newGame.gameInitialization();
  }
});
