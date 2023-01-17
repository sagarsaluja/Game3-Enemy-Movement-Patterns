/** @type {HTMLCanvasElement} */
//this above line suggests built-in functions on typing context.
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 800;
let GAME_FRAME = 0;

const enemyImage1 = new Image();
enemyImage1.src = "Assets/enemies/enemy1.png";
class Enemy {
  constructor(image) {
    this.image = image;
    this.frameWidth = image.width / 6;
    this.frameHeight = image.height;
    this.x = Math.random() * (canvas.width - this.frameWidth); //random number between 0 , canvas_width
    this.y = Math.random() * (canvas.height - this.frameHeight);
    this.speedX = -1 * Math.random() + Math.random();
    this.speedY = -1 * Math.random() + Math.random();
    this.currentEnemyAnimationFrameX = 0;
    this.currentEnemyAnimationFrameY = 0;
    this.flapSpeed = Math.floor(Math.random() * 15 + 1);
  }
  update() {
    if (GAME_FRAME % this.flapSpeed === 0) {
      if (this.currentEnemyAnimationFrameX >= this.frameWidth * 5) {
        this.currentEnemyAnimationFrameX = 0;
      } else {
        this.currentEnemyAnimationFrameX += this.frameWidth;
      }

      if (this.x <= 0 || this.x + this.frameWidth >= canvas.width)
        this.speedX *= -1;
      this.x += this.speedX;
      if (this.y <= 0 || this.y + this.frameHeight >= canvas.height)
        this.speedY *= -1;
      this.y += this.speedY;
    }
  }
  draw() {
    context.drawImage(
      this.image,
      this.currentEnemyAnimationFrameX,
      this.currentEnemyAnimationFrameY,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.frameWidth,
      this.frameHeight
    );
  }
}

const enemiesArray = [];
const numberOfEnemies = 3;
for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy(enemyImage1));
}

const animate = () => {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.draw();
    enemy.update();
  });

  GAME_FRAME++;
  requestAnimationFrame(animate);
};
animate();
