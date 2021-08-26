window.addEventListener("load", function () {
  const firstPrompt = document.getElementById("first-prompt");
  const introduction = document.getElementById("introduction");
  const instructions = document.getElementById("instructions");
  const submit = document.getElementById("submit-btn");
  const next = document.getElementById("next-btn");

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    firstPrompt.style.display = "none";
    introduction.style.display = "block";
  });

  next.addEventListener("click", (e) => {
    e.preventDefault();
    introduction.style.display = "none";
    instructions.style.display = "block";
  });

  document
    .getElementById("start-button")
    .addEventListener("click", function (e) {
      e.preventDefault();
      startGame();
    });

  document
    .getElementById("restart-button-go")
    .addEventListener("click", function (e) {
      e.preventDefault();
      startGame();
    });

  document
    .getElementById("restart-button-gw")
    .addEventListener("click", function (e) {
      e.preventDefault();
      startGame();
    });

  function startGame() {
    const newGame = new Game();
    newGame.gameInitialization();
  }
});
