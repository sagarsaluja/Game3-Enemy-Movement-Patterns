/** @type {HTMLCanvasElement} */
//this above line suggests built-in functions on typing context.
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 800;

enemy1 = {
  x: 10,
  y: 50,
  width: 200,
  height: 200,
};
const animate = () => {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fillRect(enemy1.x++, enemy1.y, enemy1.width, enemy1.height);
  requestAnimationFrame(animate);
};
animate();
