// 7 - Sep - 2023
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cWidth = canvas.width = 1000;
const cHeight = canvas.height = 600;

// load sounds
let hit = new Audio("./sounds/hit.mp3");
let wall = new Audio("./sounds/wall.mp3");
let userScore = new Audio("./sounds/userScore.mp3");
let comScore = new Audio("./sounds/comScore.mp3");

// hit.src = "./sounds/hit.mp3";
// wall.src = "./sounds/wall.mp3";
// comScore.src = "./sounds/comScore.mp3";
// userScore.src = "./sounds/userScore.mp3";

// console.log(userScore);
// console.log(userScore.play());

const user = {
    xAxis: 0,
    yAxis: (cHeight - 200) / 2,
    width: 20,
    height: 200,
    color: '#DDD',
    score: 0,
    // draw() {
    //     ctx.fillStyle = this.color;
    //     ctx.fillRect(this.xAxis, this.yAxis, this.width, this.height);
    // }
}

const comp = {
    xAxis: cWidth - 20,
    yAxis: cHeight / 2 - 200 / 2,
    width: 20,
    height: 200,
    color: '#DDD',
    score: 0,
    // draw() {
    //     ctx.fillStyle = this.color;
    //     ctx.fillRect(this.xAxis, this.yAxis, this.width, this.height);
    // }
}

const ball = {
    xAxis: cWidth / 2,
    yAxis: cHeight / 2,
    radius: 30,
    speed: 7,
    velocityX: 5, // velocity = speed + directionX
    velocityY: 5, // velocity = speed + directionY
    color: '#DDD',
}

const net = {
    xAxis: (cWidth - 2) / 2,
    yAxis: 0,
    width: 2,
    height: 4,
    color: '#DDD',
}

const drawRect = (xAxis, yAxis, width, height, color) => {
    ctx.fillStyle = color
    ctx.fillRect(xAxis, yAxis, width, height);
}

const drawBall = (xAxis, yAxis, radius, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(xAxis, yAxis, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

const drawText = (xAxis, yAxis, text, color) => {
    ctx.fillStyle = color;
    ctx.font = '80px Arial';
    ctx.fillText(text, xAxis, yAxis);
}

const drawNet = () => {
    for (let i = 0; i <= cHeight; i += 10) {
        drawRect(net.xAxis, net.yAxis + i, net.width, net.height, net.color);
    }
}

const collisionDetection = (ball, player) => {
    const { radius } = ball;
    ball.top = ball.yAxis - radius;
    ball.bottom = ball.yAxis + radius;
    ball.left = ball.xAxis - radius;
    ball.right = ball.xAxis + radius;

    const { height, width } = player;
    player.top = player.yAxis;
    player.bottom = player.yAxis + height;
    player.left = player.xAxis;
    player.right = player.xAxis + width;

    return ball.right > player.left &&
        ball.bottom > player.top &&
        ball.top < player.bottom &&
        ball.left < player.right;
}

const afterCollision = () => {

    // detect the player...
    let player = (ball.xAxis < cWidth / 2) ? user : comp;

    if (collisionDetection(ball, player)) {

        // console.log('collision');
        // ball.velocityX = -ball.velocityX; // change the X direction...

        // play sound
        hit.play();

        // we check where the ball hits the paddle
        let playerCenterPoint = player.yAxis + player.height / 2;
        let collidePoint = ball.yAxis - playerCenterPoint;

        // normalization... // this parenthesis order is very important...
        collidePoint = collidePoint / (player.height / 2);

        // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
        // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
        // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
        // Math.PI/4 = 45degrees
        let angle = collidePoint * Math.PI / 4;

        // change the X and Y velocity direction
        // ball hit by user || computer...
        let direction = (ball.xAxis < cWidth / 2) ? 1 : -1;

        // change the velocity x & y
        // velocity = speed + direction
        ball.velocityX = ball.speed * Math.cos(angle) * direction;
        ball.velocityY = ball.speed * Math.sin(angle);

        // every time the ball hit the paddle increase its speed...
        ball.speed += 0.5;
    }
}

const resetBall = () => {
    ball.xAxis = cWidth / 2;
    ball.yAxis = cHeight / 2;

    ball.speed = 7;
    ball.velocityX = -ball.velocityX; // direction change, start by computer... right side...
}

const updateScore = () => {
    // update the score...

    let ballLeftSide = ball.xAxis - ball.radius;
    let ballRightSide = ball.xAxis + ball.radius;

    if (ballLeftSide < 0) {
        comp.score++; // computer win..
        comScore.play();
        resetBall();
    } else if (ballRightSide > cWidth) {
        user.score++; // user win...
        userScore.play();
        resetBall();
    }
}

const updateGame = () => {
    ball.xAxis = ball.xAxis + ball.velocityX;
    ball.yAxis = ball.yAxis + ball.velocityY;

    // simple AI to control the paddle
    let compLevel = 0.025;
    comp.yAxis += (ball.yAxis - (comp.yAxis + comp.height / 2)) * compLevel;

    let ballBottom = ball.yAxis + ball.radius;
    let ballTop = ball.yAxis - ball.radius;

    // when the ball collides with bottom and top walls we inverse the y velocity.
    if (ballBottom > cHeight || ballTop < 0) {
        ball.velocityY = -ball.velocityY; // change the Y direction...
        wall.play();
    }

    afterCollision()

    updateScore();
}

const renderGame = () => {
    // clear the canvas
    drawRect(0, 0, cWidth, cHeight, '#000');

    drawNet();

    drawText(cWidth / 4, cHeight / 5, user.score, user.color);
    drawText(3 * cWidth / 4, cHeight / 5, comp.score, comp.color);

    drawRect(user.xAxis, user.yAxis, user.width, user.height, user.color);
    drawRect(comp.xAxis, comp.yAxis, comp.width, comp.height, comp.color);

    drawBall(ball.xAxis, ball.yAxis, ball.radius, ball.color);
}

const gameAnimation = () => {
    updateGame();
    renderGame();
}

const framePerSecond = 50;
setInterval(gameAnimation, 1000 / framePerSecond); // game animation start...
// call gameAnimation() ==> 50 times every 1000ms == 1s...


const handleMouseMoveInsideCanvas = (e) => {

    let totalPosition = canvas.getBoundingClientRect();

    // start user paddle move by user mouse movement... 
    user.yAxis = e.clientY - totalPosition.top - user.height / 2;
}

canvas.addEventListener('mousemove', handleMouseMoveInsideCanvas);