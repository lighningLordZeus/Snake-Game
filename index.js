//board
var blockSize = 20;
var rows = 20;
var cols = 20;
var board;
var context;

//snake
var snakeX = blockSize * 9;
var snakeY = blockSize * 9;

var velocityX = 1;
var velocityY = 0;

var currentDirection = "right";

var snakeBody = [];

//food
foodX = Math.floor(Math.random() * cols) * blockSize;
foodY = Math.floor(Math.random() * rows) * blockSize;

// Score
var score = 0;
var highScore = 0;

// Initial game state
let gameState = "start"; // start, playing, gameOver

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); // used for drawing on the board

  // Additional setup for screens
  showStartScreen();
  document.addEventListener("keydown", onkeydown);
  setInterval(update, 1000 / 10); //100 milliseconds
  setInterval(eatfood, 0);
};

function eatfood() {
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
    score++;

    if (score > highScore) {
      highScore = score;
    }
  }
}

function update() {
  if (gameState === "playing") {
    context.fillStyle = "#cccccc";
    context.fillRect(0, 0, board.width, board.height);

    // Update the snake's velocity based on the current direction
    if (currentDirection === "up" && velocityY !== 1) {
      velocityX = 0;
      velocityY = -1;
    } else if (currentDirection === "down" && velocityY !== -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (currentDirection === "left" && velocityX !== 1) {
      velocityX = -1;
      velocityY = 0;
    } else if (currentDirection === "right" && velocityX !== -1) {
      velocityX = 1;
      velocityY = 0;
    }

    context.fillStyle = "#828282";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    const smallerSize = 10;
    const smallerX = foodX + (blockSize - smallerSize) / 2;
    const smallerY = foodY + (blockSize - smallerSize) / 2;
    context.fillStyle = "white";
    context.fillRect(smallerX, smallerY, smallerSize, smallerSize);

    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
      snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "black";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
      context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // game over conditions
    if (
      snakeX < -1 ||
      snakeX > cols * blockSize - 1 ||
      snakeY < -1 ||
      snakeY > rows * blockSize - 1
    ) {
      gameOver = true;
      showGameOverScreen();
    }

    for (let i = 0; i < snakeBody.length; i++) {
      if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
        gameOver = true;
        showGameOverScreen();
      }
    }

    document.getElementById("score").textContent = score
      .toString()
      .padStart(3, "0");
  }
}

function onkeydown(e) {
  if (e.code === "Space") {
    if (gameState === "start") {
      hideStartScreen();
      gameState = "playing";
    } else if (gameState === "gameOver") {
      resetGame();
    }
  } else if (gameState === "playing") {
    changeDirection(e);
  }
}

function changeDirection(e) {
  if (gameState !== "playing") {
    return; // Ignore input if not in the playing state
  }

  // Handle input and set the current direction
  if (e.code == "ArrowUp" || e.code == "KeyW") {
    currentDirection = "up";
  } else if (e.code == "ArrowDown" || e.code == "KeyS") {
    currentDirection = "down";
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    currentDirection = "left";
  } else if (e.code == "ArrowRight" || e.code == "KeyD") {
    currentDirection = "right";
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function resetGame() {
  hideGameOverScreen();
  document.getElementById("highscore").textContent = highScore
    .toString()
    .padStart(3, "0");
  document.getElementById("highscore").style.visibility = "visible";
  gameState = "playing";
  snakeX = blockSize * 9;
  snakeY = blockSize * 9;
  velocityX = 1;
  velocityY = 0;
  snakeBody = [];
  placeFood();
  score = 0;
}

function showStartScreen() {
  document.getElementById("startScreen").style.display = "block";
}

function hideStartScreen() {
  document.getElementById("startScreen").style.display = "none";
}

function showGameOverScreen() {
  document.getElementById("gameOverScreen").style.display = "block";
  gameState = "gameOver";
}

function hideGameOverScreen() {
  document.getElementById("gameOverScreen").style.display = "none";
}
