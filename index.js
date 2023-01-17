/** @type {HTMLCanvasElement} */
//this above line suggests built-in functions on typing context.
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 800;

class Enemy {
  constructor() {
    this.width = 100;
    this.height = 100;
    this.y = Math.random() * (canvas.height - this.height);
    this.x = Math.random() * (canvas.width - this.width); //random number between 0 , canvas_width
    this.speedX = -1 * Math.random();
    this.speedY = -1 * Math.random();
  }
  update() {
    if (this.x <= 0 || this.x + this.width >= canvas.width) this.speedX *= -1;
    this.x += this.speedX;
    if (this.y <= 0 || this.y + this.height >= canvas.height) this.speedY *= -1;
    this.y += this.speedY;
  }
  draw() {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

const enemiesArray = [];
const numberOfEnemies = 10;
for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
  console.log(enemiesArray[i].x, enemiesArray[i].y);
}

const animate = () => {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.draw();
    enemy.update();
  });
  requestAnimationFrame(animate);
};
animate();
