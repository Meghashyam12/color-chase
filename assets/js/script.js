const colors = [
  "red",
  "green",
  "blue",
  "pink",
  "black",
  "grey",
  "brown",
  "orange",
  "yellow",
];
let score = 0;
let penalty = 0;
let hasGameStarted = false;
let times = [];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * 9)];
};

const hasGameEnded = () => score + penalty >= 5;

const showReactionTime = () => {
  let sum = 0;
  for (let index = 0; index < times.length - 1; index++) {
    sum += times[index + 1] - times[index];
  }

  const result = document.querySelector("#result");
  result.textContent = `Your average reaction time:${
    (sum + penalty * 1000) / 5
  }ms. The target reaction time is 1000ms`;
  result.style.display = "block";
};

const resetGame = (text, startButton) => {
  score = 0;
  penalty = 0;
  times = [];
  text.textContent = "";
  hasGameStarted = false;
  startButton.style.display = "block";
};

const updateScore = (event, text) => {
  if (event.target.style.backgroundColor === text.textContent) {
    score += 1;
  } else {
    penalty += 1.5;
  }
};

const shuffleColors = () => {
  const squares = document.querySelectorAll(".square");
  const shuffledColors = colors.sort(() => Math.floor(Math.random() * 3) - 1);
  for (let index = 0; index < squares.length; index++) {
    squares[index].style.backgroundColor = shuffledColors[index];
  }
};

const compareColors = (text, event, startButton) => {
  if (!hasGameStarted) return;
  times.push(Date.now());

  updateScore(event, text);
  text.textContent = getRandomColor();
  shuffleColors();

  if (hasGameEnded()) {
    showReactionTime();
    resetGame(text, startButton);
  }

  return;
};

const setCountdown = (text) => {
  let countdown = 3;
  const countdownID = setInterval(() => {
    text.textContent = countdown;
    countdown -= 1;
    if (countdown < 0) {
      clearInterval(countdownID);
    }
  }, 1000);
  setTimeout(() => {
    hasGameStarted = true;
    text.textContent = getRandomColor();
    shuffleColors();
    times.push(Date.now());
  }, 4000);
};

const startGame = (text, startButton) => {
  const result = document.querySelector("#result");
  result.textContent = "";
  result.style.display = "none";
  startButton.style.display = "none";
  setCountdown(text);
};

const createDefaults = (result, text, startButton) => {
  result.setAttribute("id", "result");
  container.appendChild(result);
  text.textContent = "Good Luck";

  startButton.addEventListener("click", (event) =>
    startGame(text, startButton)
  );
};

const colourSquares = (squares, text, startButton) => {
  for (let squareIndex = 0; squareIndex < squares.length; squareIndex++) {
    const blockColor = colors[squareIndex];

    squares[squareIndex].style.backgroundColor = blockColor;
    squares[squareIndex].addEventListener("click", (event) =>
      compareColors(text, event, startButton)
    );
  }
};

const main = () => {
  const squares = document.querySelectorAll(".square");
  const startButton = document.querySelector("#start-button");
  const text = document.querySelector("#target-color");
  const result = document.createElement("div");

  createDefaults(result, text, startButton);
  colourSquares(squares, text, startButton);
};

window.onload = main;
