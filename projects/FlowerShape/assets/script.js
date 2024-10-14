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

// shapes are drawn behind the older ones...
ctx.globalCompositeOperation = "destination-over";

// mouse pointer holder...
const mousePointer = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("mousemove", (e) => {
  // set/update mouse pointer every time, when mouse move inside canvas...
  mousePointer.x = e.x;
  mousePointer.y = e.y;

  // clearAllPreviousFrames();
  // drawCircle();
});

window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const clearAllPreviousFrames = () => {
  // clear all previous rendering frame from canvas...
  // so if want to clear ==> old frames & if only want to see the current frame...
  // so the old paint is being deleted between every animation frame... then call this method...
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// set value to be middle/center of the canvas
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// global variable, to use as settings for our algorithm
let hue = Math.random() * 360;
let frameNumber = 0;
let scale = 10; // this will play a role in making our radius grow so our flower grows from the center outwards
let cSize = Math.random() * 20;
let lineWidth = Math.random() * 10;
let drawingFlower = Math.random() * 10; // by changing this value, generate different flowers...
// let cSize = number;

const colors = [
  "green",
  "black",
  "blue",
  "orange",
  "orangered",
  "pink",
  "red",
  "tomato",
  "white",
  "brown",
  "gray",
];

const drawCircle = () => {
  // 1st
  // calculate position for this particle, for this particular animation frame
  let angle = frameNumber * drawingFlower;
  let radius = scale * Math.sqrt(frameNumber); // this will determine size of circular path our particle is taken
  let positionX = radius * Math.sin(angle) + centerX; // Math.sine ==> does is it returns a number between -1 and +1
  let positionY = radius * Math.cos(angle) + centerY; // Math.cos ==> does is it returns a number between +1 and -1

  // 2nd
  // use canvas api, built-in drawing methods, to draw a shape we wan...
  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.strokeStyle = colors[1]; // stroke properties
  ctx.lineWidth = lineWidth; // stroke properties

  // circle drawing methods call...
  ctx.beginPath();
  ctx.arc(positionX, positionY, cSize, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill(); // fill method call() for draw...
  ctx.stroke(); // stroke method call() for draw...

  hue += 0.5;
  frameNumber++; // for each frame we also increase our number variable
  // this will cause the particle that draws our effect to move around...
};

// by calling animate function
// its job will be to create our animation loop
// which will just basically redraw canvas over and over creating an illusion of movement.

const animate = () => {
  // clearAllPreviousFrames();

  drawCircle();

  // animation stopper...
  if (frameNumber > 300) return; // return keyword will make function to stop on this line...

  // pass it as an argument the name of its parent function
  // so our animate function will just call itself over and over
  // to create an animation loop through a programming principle called recursion
  requestAnimationFrame(animate);
  // this function is better because it will adjust to your screen refresh rate
  // always try to use this function... it's a good practice for performance
};

animate();
