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
    this.x = Math.random() * canvas.width; //random number between 0 , canvas_width
    this.y = Math.random() * (canvas.height - this.frameHeight);
    this.speedX = -3 * Math.random();
    this.speedY = (-1 * Math.random() + Math.random()) * 3;
    this.currentAnimationFrameX = 0;
    this.currentAnimationFrameY = 0;
    this.flapSpeed = Math.floor(Math.random() * 5 + 1);
    this.gameFrame = 0;
    this.angle = -Math.PI * Math.random() + Math.PI * Math.random();
    this.angleSpeed = 0.1 * Math.random();
  }
  update() {
    this.gameFrame++;
    if (this.gameFrame % this.flapSpeed === 0) {
      if (this.currentAnimationFrameX >= this.frameWidth * 5) {
        this.currentAnimationFrameX = 0;
      } else {
        this.currentAnimationFrameX += this.frameWidth;
      }
    }

    if (this.x <= -this.frameWidth) this.x = canvas.width;
    this.x += this.speedX;
    this.y += Math.sin(this.angle);
    this.angle += this.angleSpeed;
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
      this.frameWidth / 3,
      this.frameHeight / 3
    );
  }
}

const enemiesArray = [];
const numberOfEnemies = 25;
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
