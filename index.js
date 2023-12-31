//board
var blockSize = 20;
var rows = 20;
var cols = 20;
var board;
var context;

//snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX = blockSize * 10;
var foodY = blockSize * 10;

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
  setInterval(update, 1000 / 5); //100 milliseconds
};

function update() {
  if (gameState === "playing") {
    context.fillStyle = "#cccccc";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "grey";
    context.fillStyle = "white";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
      snakeBody.push([foodX, foodY]);
      placeFood();
    }

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
  if ((e.code == "ArrowUp" || e.code == "KeyW") && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if ((e.code == "ArrowDown" || e.code == "KeyS") && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if ((e.code == "ArrowLeft" || e.code == "KeyA") && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if ((e.code == "ArrowRight" || e.code == "KeyD") && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function resetGame() {
  hideGameOverScreen();
  gameState = "playing";
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;
  velocityX = 0;
  velocityY = 0;
  snakeBody = [];
  placeFood();
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
