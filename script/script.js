// On window load, addEventListener 'click' to start

window.addEventListener("load", function () {
  const firstPrompt = document.getElementById("first-prompt");
  const introduction = document.getElementById("introduction");
  const instructions = document.getElementById("instructions");
  const submit = document.getElementById("submit-btn");
  const next = document.getElementById("next-btn");

  submit.addEventListener("click", (event) => {
    event.preventDefault();
    firstPrompt.style.display = "none";
    introduction.style.display = "block";
  });

  next.addEventListener("click", (event) => {
    event.preventDefault();
    introduction.style.display = "none";
    instructions.style.display = "block";
  });

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
