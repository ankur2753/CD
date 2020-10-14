import Snake from './SnakeClass.js'
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


var redSnake =new Snake();

function update(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  redSnake.draw(ctx);
  requestAnimationFrame(update);
}

update();

window.addEventListener("keydown", (e) => redSnake.move(e.keyCode));
window.addEventListener("keydown", (e) =>{if (e.keyCode==32) {
  redSnake.grow();
}});
