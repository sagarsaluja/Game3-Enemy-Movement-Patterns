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
    this.speedX = -1 * Math.random() * 5;
    this.speedY = (-1 * Math.random() + Math.random()) * 5;
    this.currentEnemyAnimationFrameX = 0;
    this.currentEnemyAnimationFrameY = 0;
    this.flapSpeed = Math.floor(Math.random() * 20 + 1);
    this.angle = 7 * Math.random();
    this.angleSpeed = Math.random();
    this.curve = 7 * Math.random();
    //add sine wave to y
  }
  update() {
    if (GAME_FRAME % this.flapSpeed === 0) {
      if (this.currentEnemyAnimationFrameX >= this.frameWidth * 5) {
        this.currentEnemyAnimationFrameX = 0;
      } else {
        this.currentEnemyAnimationFrameX += this.frameWidth;
      }

      if (this.x <= -this.frameWidth) this.x = canvas.width;
      this.x += this.speedX;
      if (this.y <= 0 || this.y + this.frameHeight / 3 >= canvas.height)
        this.speedY *= -1;

      this.y += this.curve * Math.sin(this.angle);
      this.angle += this.angleSpeed;
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
      this.frameWidth / 3,
      this.frameHeight / 3
    );
  }
}

const enemiesArray = [];
const numberOfEnemies = 10;
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
