const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreSpan = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const gridSize = 20;
const canvasSize = canvas.width;
const tileCount = canvasSize / gridSize;

let snake = [{ x: 9, y: 9 }];
let velocity = { x: 1, y: 0 };
let food = randomFood();
let score = 0;
let gameOver = false;

function randomFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
  } while (snake.some(part => part.x === newFood.x && part.y === newFood.y));
  return newFood;
}

function drawRect(x, y, color) {
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function clearCanvas() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvasSize, canvasSize);
}

function draw() {
  if (gameOver) return;

  clearCanvas();

  drawRect(food.x, food.y, "#FF00FF");

  let head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };


  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    endGame();
    return;
  }

 
  if (snake.some(part => part.x === head.x && part.y === head.y)) {
    endGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreSpan.textContent = score;
    food = randomFood();
  } else {
    snake.pop();
  }

  // Desenha cobra
  for (let i = 0; i < snake.length; i++) {
    let color = i === 0 ? "#00FFFF" : "#39FF14";
    drawRect(snake[i].x, snake[i].y, color);
  }
}

function endGame() {
  gameOver = true;
  restartBtn.classList.remove("hidden");
  alert(`Game Over! Sua pontuação final foi ${score}`);
}

function restartGame() {
  snake = [{ x: 9, y: 9 }];
  velocity = { x: 1, y: 0 };
  food = randomFood();
  score = 0;
  scoreSpan.textContent = score;
  gameOver = false;
  restartBtn.classList.add("hidden");
  loop();
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
    case "W":
      if (velocity.y === 1) break;
      velocity = { x: 0, y: -1 };
      break;
    case "ArrowDown":
    case "s":
    case "S":
      if (velocity.y === -1) break;
      velocity = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      if (velocity.x === 1) break;
      velocity = { x: -1, y: 0 };
      break;
    case "ArrowRight":
    case "d":
    case "D":
      if (velocity.x === -1) break;
      velocity = { x: 1, y: 0 };
      break;
  }
});

restartBtn.addEventListener("click", restartGame);

function loop() {
  if (!gameOver) {
    draw();
    setTimeout(loop, 200);
  }
}
window.focus();

loop();
