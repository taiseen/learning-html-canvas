// 10 - Sep - 2023

// It’s like, if canvas is a blank sheet of paper...
// the canvas’s context (ctx) is the pen.
// other way you’ll tell your pen to draw something on a blank sheet of paper...

const canvas = document.getElementById("canvas");
const pen = canvas.getContext("2d");

const cWidth = (canvas.width = 608);
const cHeight = (canvas.height = 608);

const box = 32; // create a pixel unit...

// get all side of boundary area value from bg image...
const boundaryTop = box * 3;
const boundaryLeft = box;
const boundaryRight = box * 17;
const boundaryBottom = box * 17;

const imgBg = new Image();
imgBg.src = "./assets/img/bg.png"; // for background image...

const imgFood = new Image();
imgFood.src = "./assets/img/food.png"; // for food image...


// init audio object...
let up = new Audio();
let down = new Audio();
let left = new Audio();
let right = new Audio();
let dead = new Audio();
let eat = new Audio();

// load audio file inside audio object...
up.src = "./assets/audio/up.mp3";
down.src = "./assets/audio/down.mp3";
left.src = "./assets/audio/left.mp3";
right.src = "./assets/audio/right.mp3";
dead.src = "./assets/audio/dead.mp3";
eat.src = "./assets/audio/eat.mp3";


const snake = []; // create a snake [array]...

// initialized snake x & y position {object}... [center of the canvas]
snake[0] = {
  xAxis: box * 9,
  yAxis: box * 10,
};

// generate randomly food at x & y position {object} inside bg...
let food = {
  xAxis: Math.floor(Math.random() * 17 + 1) * box,
  yAxis: Math.floor(Math.random() * 15 + 3) * box,
};

let score = 0; // create a score variable...
let direction; // direction to go/move...

const keyMove = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down',
}


const snakeHitItselfCollision = (snake, newHead) => {
  // snake    ==> [array of {objects}...]
  // newHead  ==> single {object}
  // console.log(snake);

  for (let i = 0; i < snake.length; i++) {
    if (
      newHead.xAxis == snake[i].xAxis &&
      newHead.yAxis == snake[i].yAxis
    ) {
      return true;
    }
  }

  return false;
}



// draw every thing, inside canvas...
const draw = () => {
  pen.drawImage(imgBg, 0, 0); // draw the background from image file inside canvas
  pen.drawImage(imgFood, food.xAxis, food.yAxis); // draw the food from image file inside canvas

  // draw the shake...
  for (let i = 0; i < snake.length; i++) {
    pen.fillStyle = i === 0 ? "green" : "white";
    pen.fillRect(snake[i].xAxis, snake[i].yAxis, box, box);

    pen.strokeStyle = "tomato";
    pen.strokeRect(snake[i].xAxis, snake[i].yAxis, box, box);
  }

  // draw text for display the score...
  pen.fillStyle = 'white';
  pen.font = '40px Change one';
  pen.fillText(score, 2 * box, 1.55 * box);


  // store snake ==> old head... single {object}
  let snakeX = snake[0].xAxis;
  let snakeY = snake[0].yAxis;

  const { left, up, right, down } = keyMove;
  if (direction === left) snakeX = snakeX - box;
  if (direction === right) snakeX = snakeX + box;
  if (direction === down) snakeY = snakeY + box;
  if (direction === up) snakeY = snakeY - box;

  // snake eat food...
  if (snakeX === food.xAxis && snakeY === food.yAxis) {
    // do 2 things...

    //  1. increment score
    score++;

    //  2. generate new food...
    food = {
      xAxis: Math.floor(Math.random() * 17 + 1) * box,
      yAxis: Math.floor(Math.random() * 15 + 3) * box,
    };

    eat.play();

    // wont remove tail...
  } else {
    // remove snake tail form [array] of {object's}...
    snake.pop();
  }

  // calling this line here... then snake tail never grow...
  // snake.pop(); 🟥🟥🟥🟥🟥🟥

  // create snake ==> new head...
  const snakeNewHead = {
    xAxis: snakeX,
    yAxis: snakeY,
  }

  // game over rules
  if (
    snakeX > boundaryRight ||
    snakeX < boundaryLeft ||
    snakeY > boundaryBottom ||
    snakeY < boundaryTop ||
    snakeHitItselfCollision(snake, snakeNewHead)
  ) {
    clearInterval(game);
    dead.play();
  }

  // add snake new head, form [array] of {object's}...
  snake.unshift(snakeNewHead);
};

// call draw() function ==> every 100 milliseconds...
const framePerSecond = 150; // here its work like snake movement speed...
let game = setInterval(draw, framePerSecond);


const handleKeyNavigation = (e) => {

  const { keyCode } = e;

  switch (keyCode) {

    case 37:
      if (direction !== keyMove.right) {
        direction = keyMove.left;
        left.play();
      }
      break;

    case 38:
      if (direction !== keyMove.down) {
        direction = keyMove.up;
        up.play();
      }
      break;

    case 39:
      if (direction !== keyMove.left) {
        direction = keyMove.right;
        right.play();
      }
      break;

    case 40:
      if (direction !== keyMove.up) {
        direction = keyMove.down;
        down.play();
      }
      break;

    default:
      break;
  }

}

document.addEventListener('keydown', handleKeyNavigation);