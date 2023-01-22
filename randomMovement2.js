/** @type {HTMLCanvasElement} */
//this above line suggests built-in functions on typing context.
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 800;
let GAME_FRAME = 0;

const enemyImage1 = new Image();
enemyImage1.src = "Assets/enemies/enemy2.png";
class Enemy {
  constructor(image) {
    this.image = image;
    this.frameWidth = image.width / 6;
    this.frameHeight = image.height;
    this.x = (Math.random() * (canvas.width - this.frameWidth)) / 2;
    this.y = (Math.random() * (canvas.height - this.frameHeight)) / 2;
    this.currentAnimationFrameX = 0;
    this.currentAnimationFrameY = 0;
    this.flapSpeed = Math.floor(Math.random() * 200) + 50;
    this.flapSpeed2 = Math.floor(Math.random() * 10) + 3;
    this.gameFrame = 0;
    this.newX = 0;
    this.newY = 0;
    this.dx = 0;
    this.dy = 0;
  }
  update() {
    if (this.gameFrame % this.flapSpeed === 0) {
      this.newX = Math.random() * (canvas.width - this.frameWidth);
      this.newY = Math.random() * (canvas.height - this.frameHeight);
    }

    if (this.gameFrame % this.flapSpeed2 === 0) {
      if (this.currentAnimationFrameX >= this.image.width - this.frameWidth) {
        this.currentAnimationFrameX = 0;
      } else {
        this.currentAnimationFrameX += this.frameWidth;
      }
    }
    this.dx = this.x - this.newX;
    this.dy = this.y - this.newY;
    this.x -= this.dx / 70;
    this.y -= this.dy / 70;

    this.gameFrame++;
  }
  draw() {
    context.drawImage(
      this.image,
      this.currentAnimationFrameX,
      this.currentAnimationFrameY,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.frameWidth / 2,
      this.frameHeight / 2
    );
  }
}

const enemiesArray = [];
const numberOfEnemies = 5;
for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy(enemyImage1));
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
