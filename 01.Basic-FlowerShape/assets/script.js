// 31 - Aug - 2023

const canvas = document.getElementById("htmlCanvas");

// by this line javascript understand...
// from two api's (2d, webgl), which one we want to use in this project.
// set ctx to be equal to whatever canvas.getcontext2d method returns...
// so getcontext("2d") returns a built-in object called ==> canvasrenderingcontext2d
// that's how canvas 2d api works
// we are just pulling these pre-built methods from this [ctx] object
// and calling them the draw on canvas
const ctx = canvas.getContext("2d");
// & now we can call all built-in canvas api 2d methods from this ctx variable...
// methods that allow us to draw line, circle, square and so much more...

// must mandatory to set this width & height...
// otherwise drawing won't work properly...
// so to make sure the canvas covers the entire browser window...
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// this code will run just once on the initial page load
// so if you want to change canvas size(width & height) when you resize browser window...
// then this code will have to set also inside resize event listener
// so it runs every time resize even occurs in browser

// mouse pointer holder...
const mousePointer = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("mousemove", (e) => {
  // set/update mouse pointer every time, when mouse move inside canvas...
  mousePointer.x = e.x;
  mousePointer.y = e.y;

  clearAllPreviousFrames();
  drawCircle();
});

const clearAllPreviousFrames = () => {
  // clear all previous rendering frame from canvas...
  // so if want to clear ==> old frames & if only want to see the current frame...
  // so the old paint is being deleted between every animation frame... then call this method...
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawCircle = () => {
  const circleSize = 50;
  ctx.fillStyle = "tomato";
  ctx.fill();

  // circle drawing methods call...
  ctx.beginPath();
  ctx.arc(mousePointer.x, mousePointer.y, circleSize, 0, Math.PI * 2);
  //   ctx.arc(200, 200, circleSize, 0, Math.PI * 2);
  //   ctx.closePath();

  // stroke properties
  //   ctx.strokeStyle = "black";
  //   ctx.lineWidth = 5;
  //   ctx.stroke();
};

// by calling animate function
// its job will be to create our animation loop
// which will just basically redraw canvas over and over creating an illusion of movement.

const animate = () => {
  //   drawCircle();

  // pass it as an argument the name of its parent function
  // so our animate function will just call itself over and over
  // to create an animation loop through a programming principle called recursion
  requestAnimationFrame(animate);
};

animate();
