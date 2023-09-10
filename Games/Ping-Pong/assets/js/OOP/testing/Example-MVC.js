import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import Net from "./Net.js";

// Model - Manages game data and logic
class GameModel {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.user = new Paddle(0, canvasHeight);
        this.comp = new Paddle(canvasWidth - 20, canvasHeight);
        this.ball = new Ball(canvasWidth, canvasHeight);
        this.net = new Net(canvasWidth);
        this.hitSound = new Audio("./sounds/hit.mp3");
        this.wallSound = new Audio("./sounds/wall.mp3");
        this.userScoreSound = new Audio("./sounds/userScore.mp3");
        this.compScoreSound = new Audio("./sounds/comScore.mp3");
    }

    update() {
        this.ball.update(this.user, this.comp);
    }

    resetBall() {
        this.ball.reset(this.canvasWidth, this.canvasHeight);
    }

    userScores() {
        this.user.score++;
        this.userScoreSound.play();
        this.resetBall();
    }

    compScores() {
        this.comp.score++;
        this.compScoreSound.play();
        this.resetBall();
    }
}

// View - Handles rendering and user interface
class GameView {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1000;
        this.canvas.height = 600;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(model) {
        this.clear();
        this.drawText(model.user.score, model.comp.score);
        model.net.draw(this.ctx);
        model.user.draw(this.ctx);
        model.comp.draw(this.ctx);
        model.ball.draw(this.ctx);
    }

    drawText(userScore, compScore) {
        this.ctx.fillStyle = '#DDD';
        this.ctx.font = '80px Arial';
        this.ctx.fillText(userScore, this.canvas.width / 4, this.canvas.height / 5);
        this.ctx.fillText(compScore, 3 * this.canvas.width / 4, this.canvas.height / 5);
    }
}

// Controller - Handles user input and game control
class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.canvas = view.canvas;

        // Set up mouse move event
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));

        // Set up game loop
        this.framePerSecond = 50;
        setInterval(() => this.gameLoop(), 1000 / this.framePerSecond);
    }

    handleMouseMove(e) {
        const totalPosition = this.canvas.getBoundingClientRect();
        this.model.user.y = e.clientY - totalPosition.top - this.model.user.height / 2;
    }

    gameLoop() {
        this.model.update();
        this.view.render(this.model);
    }
}

// Paddle, Ball, Net classes remain the same as in the previous code

// Initialize the game
const model = new GameModel(1000, 600);
const view = new GameView('canvas');
const controller = new GameController(model, view);
