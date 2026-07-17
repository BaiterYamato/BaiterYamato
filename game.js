const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleHeight = 80;
const paddleWidth = 10;
const ballSize = 10;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
let upArrowPressed = false;
let downArrowPressed = false;
let wPressed = false;
let sPressed = false;

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x - size / 2, y - size / 2, size, size);
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

function update() {
  if (wPressed && paddle1Y > 0) paddle1Y -= 5;
  if (sPressed && paddle1Y < canvas.height - paddleHeight) paddle1Y += 5;
  if (upArrowPressed && paddle2Y > 0) paddle2Y -= 5;
  if (downArrowPressed && paddle2Y < canvas.height - paddleHeight) paddle2Y += 5;

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX <= paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  } else if (ballX >= canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX <= 0 || ballX >= canvas.width) {
    resetBall();
  }
}

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, '#333');
  drawRect(0, paddle1Y, paddleWidth, paddleHeight, '#fff');
  drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, '#fff');
  drawBall(ballX, ballY, ballSize, '#fff');
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') upArrowPressed = true;
  if (event.key === 'ArrowDown') downArrowPressed = true;
  if (event.key === 'w' || event.key === 'W') wPressed = true;
  if (event.key === 's' || event.key === 'S') sPressed = true;
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') upArrowPressed = false;
  if (event.key === 'ArrowDown') downArrowPressed = false;
  if (event.key === 'w' || event.key === 'W') wPressed = false;
  if (event.key === 's' || event.key === 'S') sPressed = false;
});

loop();
