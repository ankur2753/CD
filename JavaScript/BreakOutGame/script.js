const showBtn = document.getElementById("show-btn");
const closeBtn = document.getElementById("close-btn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const playBtn = document.getElementById("play");
const againBtn = document.getElementById("play-again");
const modal = document.getElementById("modal-container");
const msg1 = document.getElementById("msg1");
const msg2 = document.getElementById("msg2");

let won = false;
let playB = false;
let score = 0;
let brickRows = 7;
let brickColumn = 5;

// hight scores system with local storage
if (localStorage.getItem("scores") == null) {
  localStorage.setItem("scores", "0,0,0,");
}
let z = localStorage.getItem("scores").split(",");
let highScores = [parseInt(z[0]), parseInt(z[1]), parseInt(z[2])];

// canvas objects props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2 + 60,
  speed: 4,
  dx: 4,
  dy: -4,
  size: 8,
};
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 30,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};
const brick = {
  h: 20,
  w: 80,
  padding: 20,
  offsetX: 50,
  offsetY: 40,
  visibility: true,
};
const wall = [];
for (let i = 0; i < brickRows; i++) {
  wall[i] = [];
  for (let j = 0; j < brickColumn; j++) {
    const X = i * (brick.w + brick.padding) + brick.offsetX;
    const Y = j * (brick.h + brick.padding) + brick.offsetY;
    wall[i][j] = { X, Y, ...brick };
  }
}

// Drawing the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, 360);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}
// Draw the paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score:${score}`, canvas.width - 80, 30);
}
// create bricks

function drawBricks() {
  wall.forEach((element) => {
    element.forEach((q) => {
      ctx.beginPath();
      ctx.rect(q.X, q.Y, q.w, q.h);
      ctx.fillStyle = q.visibility ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}
// movements
function movePaddle() {
  paddle.x += paddle.dx;
  // wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  // wall detection & bounce
  if (ball.x + ball.size > canvas.width || ball.x + ball.size < 0) {
    ball.dx *= -1;
  }
  if (ball.y + ball.size > canvas.height || ball.y + ball.size < 0) {
    ball.dy *= -1;
  }
  // paddle bounce
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  //breaking bricks
  wall.forEach((column) =>
    column.forEach((c) => {
      if (c.visibility) {
        if (
          ball.x - ball.size > c.X && // left brick side check
          ball.x + ball.size < c.X + c.w && // right brick side check
          ball.y + ball.size > c.Y && // top brick side check
          ball.y - ball.size < c.Y + c.h // bottom brick side check
        ) {
          ball.dy *= -1;
          c.visibility = false;
          score++;
        }
      }
    })
  );
  if (ball.y + ball.size > canvas.height) {
    playB = false;
    popup();
  }
}


// render everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}
function update() {
  draw();
  movePaddle();
  moveBall();

  if (playB) {
    playBtn.style.display = "none";
    requestAnimationFrame(update);
  }
}
function start() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Click on the Play button below to Start Playing", 100, 480);
  ctx.font = "20px Arial";
  ctx.fillStyle = "#00cc66";
  ctx.fillText("HIGH SCORES :-", 100, 100);
  ctx.fillText(`1) ${highScores[0]}`, 100, 150);
  ctx.fillText(`2) ${highScores[1]}`, 100, 200);
  ctx.fillText(`3) ${highScores[2]}`, 100, 250);
}

// popup for reset and play again
function popup() {
  modal.style.display = "flex";

  msg1.innerHTML = `${
    wall.every((column) => column.every((b) => b.visibility == false))
      ? "YAY!! you won 🎉"
      : "OOPS! Looks Like You've lost😬"
  }<br> Your Score was : ${score}`;
}
function reset() {
  highScore();
  score = 0;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2 + 60;
  paddle.x = canvas.width / 2 - 40;
  wall.forEach((col) => col.forEach((brick) => (brick.visibility = true)));
}
// play again button
againBtn.addEventListener("click", () => {
  modal.style.display = "none";
  reset();
  playB = true;
  update();
});
document.getElementById("cancel").addEventListener("click", () => {
  reset();
  start();
  modal.style.display = "none";
  playBtn.style.display = "flex";
});
function highScore() {
  // insert the new highScore in place
  for (let j = highScores.length - 1; j >= 0; j--) {
    if (score > highScores[j]) {
      highScores.splice(j, 1, score);
      break;
    }
  }
  // sort the scores **using buble sort without temp variable
  let flag = true;
  while (flag) {
    flag = false;
    for (let i = 0; i < highScores.length; i++) {
      if (highScores[i] < highScores[i + 1]) {
        highScores[i] += highScores[i + 1]; //i contains the sum of both
        highScores[i + 1] = highScores[i] - highScores[i + 1]; //i+1 is now i
        highScores[i] = highScores[i] - highScores[i + 1]; //i is now i+1
        flag = true;
      }
    }
  }
  localStorage.setItem("scores", highScores.toString());
}
// keybord events
function keyDown(e) {
  if (e.keyCode == 37) {
    paddle.dx = -paddle.speed;
  }
  if (e.keyCode == 39) {
    paddle.dx = paddle.speed;
  }
}
function keyUp(e) {
  if (e.keyCode == 37 || e.keyCode == 39) {
    paddle.dx = 0;
  }
}


// slider controls (ie show and hide button)
showBtn.addEventListener("click", () => document.body.classList.add("rules"));
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("rules")
);
// keybord capture arrow keys
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);


playBtn.addEventListener("click", () => {
  playB = true;
  update();
});
// check for not running update multiple times

start();
