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
    this.x = canvas.width - this.frameWidth;
    this.y = canvas.height - this.frameHeight;
    this.currentAnimationFrameX = 0;
    this.currentAnimationFrameY = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.gameFrame = 0;
    this.angle = -Math.PI * Math.random() + Math.PI * Math.random();
    this.angleSpeed = 1.5 * Math.random() + 0.5;
    this.scalingCurveX = (canvas.width + this.frameWidth) / 4;
    this.scalingCurveY = (this.frameHeight + canvas.height) / 2.5;
  }
  update() {
    const x1 = 45;
    const y1 = 135;
    this.x =
      this.scalingCurveX * Math.cos(this.angle * (Math.PI / x1)) +
      (canvas.width - this.frameWidth / 2) / 2;
    this.y =
      this.scalingCurveY * Math.sin(this.angle * (Math.PI / y1)) +
      (canvas.height - this.frameHeight / 2) / 2;
    //all curves are dependent on relationship between x1 and y1 , cos and sin
    //try different combinations

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
      this.frameWidth / 2,
      this.frameHeight / 2
    );
  }
}

const enemiesArray = [];
const numberOfEnemies = 200;
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
