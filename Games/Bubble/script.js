// 6 - Sep - 2023
// https://youtu.be/jl29qI62XPg

/**
 * this is a great time to skill up and change your life
 * the question is not --> is it possible to get a job... 
 * the question is --> do you want it hard enough to invest in yourself and do what it takes...
 * you are searching for coding videos on the internet... 
 * so i'd say you are already ahead of so many people...
 * who don't take action, well done...
 * 
 * to be successful you need to be prolific at least for a while 
 * 
 * you need to learn create and repeat over and over 
 * until it becomes easy, it will happen faster than you think... * 
**/

// import Player from "./Player.js";

const canvas = document.getElementById('canvas');
const canvasPosition = canvas.getBoundingClientRect(); // for measuring mouse accurate position inside canvas
const ctx = canvas.getContext('2d');

const cWidth = canvas.width = 800;
const cHeight = canvas.height = 600;

ctx.font = '30px Georgia';
ctx.fillStyle = 'green';

// const centerXPoint = cWidth / 2;
// const centerYPoint = cHeight / 2;
// const rectSize = 100;
// ctx.fillStyle = 'red';
// ctx.fillRect(centerXPoint - rectSize / 2, centerYPoint - rectSize / 2, rectSize, rectSize);
// ctx.fillRect(centerXPoint, centerYPoint, rectSize, rectSize);

let totalBubble = 0;
let bobbleMiss = 0;
let gameFrame = 0;
let score = 0;
const bubblesArray = [];

// // mouse initial position/coordination set...
// const mouse = {
//     x: cWidth / 2,
//     y: cHeight / 2,
//     isClicked: false,
// }


// // mouse click press...
// const handleMouseDown = (e) => {
//     mouse.x = (e.x - canvasPosition.left);
//     mouse.y = (e.y - canvasPosition.top);
//     mouse.isClicked = true;
// }

// // mouse click release...
// const handleMouseUp = (e) => mouse.isClicked = false;

// window.addEventListener('mousedown', handleMouseDown)
// window.addEventListener('mouseup', handleMouseUp)


class MouseHandler {
    constructor(canvas) {
        this.canvas = canvas;
        this.mouse = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            isClicked: false,
        };

        window.addEventListener('mousedown', this.handleMouseDown.bind(this));
        window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    handleMouseDown(e) {
        // for measuring mouse accurate position inside canvas
        const canvasBoundaryPosition = this.canvas.getBoundingClientRect();

        this.mouse.x = e.clientX - canvasBoundaryPosition.left; 
        this.mouse.y = e.clientY - canvasBoundaryPosition.top; 
        this.mouse.isClicked = true;
    }

    handleMouseUp() {
        this.mouse.isClicked = false;
    }
}
const mouseHandler = new MouseHandler(canvas);


// class constructor will create one new blank player object and 
// assign it properties based on class blueprint as declared...
// and gave it behavior with custom methods...
class Player {
    constructor(cWidth, cHeight) {
        this.playerXAxis = cWidth;
        this.playerYAxis = cHeight / 2;
        this.radius = 40;
        this.angle = 0;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spiteWidth = 498;
        this.spiteHeight = 327;
    }

    updatePlayerPosition() {
        // move the player towards the mouse click position,
        // to do that, we will need to <compare> player's current position & current mouse position
        const dx = this.playerXAxis - mouseHandler.mouse.x; // distance on the horizontal x-axis
        const dy = this.playerYAxis - mouseHandler.mouse.y; // distance on the vertical y-axis
        const movingSpeed = 30;

        // 🔴🔴 don't do else if here we want both of these to run at the same time 🔴🔴

        // if current mouse x position is not equal to current player's position...
        if (mouseHandler.mouse.x !== this.playerXAxis) this.playerXAxis -= dx / movingSpeed;

        // if current mouse y position is not equal to current player's position...
        if (mouseHandler.mouse.y !== this.playerYAxis) this.playerYAxis -= dy / movingSpeed;

        // this way player can move both left and right...
        // because dx and dy can be both positive or negative numbers depending on relative position between
        // mouse and player as we calculate them
    }

    // inside this playerDraw() method 
    // we can say, if mouse click is true...
    // we want to draw a line from mouse position to the player position...
    // so we can see the direction of movement...
    playerDraw() {
        // draw a circle, that represents player character...
        ctx.fillStyle = 'tomato';
        ctx.beginPath();
        ctx.arc(this.playerXAxis, this.playerYAxis, this.radius, 0, Math.PI * 2);
        ctx.fill(); // to draw the circle...
        ctx.closePath();

        // draw line by mouse click... 
        // draw line between player & mouse click position...
        if (mouseHandler.mouse.isClicked) {
            ctx.strokeStyle = 'green'
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.playerXAxis, this.playerYAxis); // set start point for the line it will be the current player position...
            ctx.lineTo(mouseHandler.mouse.x, mouseHandler.mouse.y); // this will be the endpoint of the line by current mouse position...
            ctx.stroke(); // it will connect these two points...
        }
    }
}
const player = new Player(cWidth, cHeight);




// create bubbles so we can pop them and score points...
// this will be a very basic particle system
class Bubble {
    bottomEdge = 100;

    constructor(cWidth, cHeight) {
        this.bubbleXAxis = Math.random() * cWidth; // random number between 0 and canvas width
        this.bubbleYAxis = cHeight + this.bottomEdge; // new bubbles appear in are always completely hidden below the bottom edge
        this.radius = 40; // we want all bubbles to have the same size 
        this.speed = Math.random() * 2 + 1; // will be a random number between 1 and 6.
        this.isScoreCounted = false;
        this.distance; //will keep track of distance between each individual bubble and player 
        // so we can trigger score and pop the bubble when the player is near enough...
    }

    updatePosition() {
        this.bubbleYAxis -= this.speed; // it will just move bubbles up in negative direction on vertical y axis
        // depending on their individual speed value so every bubble will rise at a slightly different speed...

        // we will use collision detection between two circles
        const dx = this.bubbleXAxis - player.playerXAxis; // distance between bubble & player x-axis
        const dy = this.bubbleYAxis - player.playerYAxis; // distance between bubble & player y-axis
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }

    drawBubble() {
        // draw a circle, that represents bubble character...
        ctx.fillStyle = 'lightblue';
        ctx.beginPath();
        ctx.arc(this.bubbleXAxis, this.bubbleYAxis, this.radius, 0, Math.PI * 2);
        ctx.fill(); // to draw the circle...
        ctx.closePath();
        ctx.stroke();
    }
}




const handleBubbles = () => {
    // so this statement will be true, at frames 50 100 150 200 and so on...
    // basically i'm saying run this code every 50 frames every 50 frames...
    if (gameFrame % 50 == 0) {
        // take bubbles array & we will call built in array push method on it
        // this method takes whatever we pass to it and pushes that to the end of the array 
        // so we pass it new bubble, & this will trigger bubble class constructor 
        // and create one new bubble object and inserts that into bubbles array 
        bubblesArray.push(new Bubble(cWidth, cHeight));
    }

    for (let i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].updatePosition();
        bubblesArray[i].drawBubble();
    }

    // by this loop add new bubble & delete old bubble...
    for (let i = 0; i < bubblesArray.length; i++) {
        const { yAxis, radius, distance, isScoreCounted } = bubblesArray[i];

        // bubba's array is growing endlessly, we actually don't want that...
        // if this bubble's vertical y position is less than 0 
        // which means it has moved past the top edge of canvas...
        // & bubbles are disappearing too early before they fully disappear behind the top edge of canvas 
        // we will fix it by adding - 
        if (yAxis < 0 - radius * 2) {
            ++totalBubble
            // called splice method splice method will cut out element at certain index from the array
            // it needs at least two arguments the first one is index of the object we want to remove...
            // so we pass it i which represents the bubble that has vertical y value less than zero
            // and we also pass it 1 to specify that we only want to remove 1 element from the array...
            bubblesArray.splice(i, 1);
            // new bubbles are being added and old ones are being removed...
        }

        // collision detection between two circles...
        if (distance < radius + player.radius) {
            // collision happen...

            if (!isScoreCounted) {
                bubblesArray[i].isScoreCounted = true;
                bubblesArray.splice(i, 1);
                // totalBubble++;
                score++;
            }
        }
    }
}


const animation = () => {
    ctx.clearRect(0, 0, cWidth, cHeight); // clear previous all frames...

    // by call handleBubbles() inside animation loop 
    // we can see that one new bubble is added to the array every 50 frames
    handleBubbles();

    player.updatePlayerPosition(); // to calculate player position...
    player.playerDraw(); // to draw a line between player and mouse and draw circle representing the player.

    ctx.fillStyle = 'black';
    ctx.fillText('total bubble: ' + totalBubble, 10, 30);

    ctx.fillStyle = 'green';
    ctx.fillText('score: ' + score, 10, 60);

    bobbleMiss = totalBubble - score;
    console.log(bobbleMiss);
    ctx.fillStyle = 'tomato';
    ctx.fillText('miss: ' + bobbleMiss, 10, 90);

    gameFrame++; //  increase it by 1 for every frame of animation...
    // we can use it to add periodic events to our game...

    requestAnimationFrame(animation);
}

animation();