import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import Net from "./Net.js";

class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1000;
        this.canvas.height = 600;

        this.user = new Paddle(this.ctx, 0, this.canvas.height);
        this.comp = new Paddle(this.ctx, this.canvas.width - 20, this.canvas.height);
        this.ball = new Ball(this.ctx, this.canvas.width, this.canvas.height);
        this.net = new Net(this.ctx, this.canvas.width);

        // Load sounds
        this.hit = new Audio();
        this.wall = new Audio();
        this.userScoreSound = new Audio();
        this.compScoreSound = new Audio();

        this.hit.src = "./assets/audio/hit.mp3";
        this.wall.src = "./assets/audio/wall.mp3";
        this.userScoreSound.src = "./assets/audio/userScore.mp3";
        this.compScoreSound.src = "./assets/audio/comScore.mp3";

        // Set up mouse move event
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMoveInsideCanvas(e));

        // Set up game loop
        this.framePerSecond = 50;
        setInterval(() => this.gameAnimation(), 1000 / this.framePerSecond);
    }

    drawCanvasBG() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawText(x, y, text, color) {
        this.ctx.fillStyle = color;
        this.ctx.font = '80px Arial';
        this.ctx.fillText(text, x, y);
    }

    handleMouseMoveInsideCanvas(e) {
        // for measuring mouse accurate position inside canvas
        const totalPosition = this.canvas.getBoundingClientRect();
        this.user.y = e.clientY - totalPosition.top - this.user.height / 2;
    }

    collisionDetection(ball, player) {
        const ballLeft = ball.x - ball.radius;
        const ballRight = ball.x + ball.radius;
        const ballTop = ball.y - ball.radius;
        const ballBottom = ball.y + ball.radius;

        const playerLeft = player.x;
        const playerRight = player.x + player.width;
        const playerTop = player.y;
        const playerBottom = player.y + player.height;

        return ballRight > playerLeft && ballBottom > playerTop && ballTop < playerBottom && ballLeft < playerRight;
    }

    afterCollision() {
        const player = this.ball.x < this.canvas.width / 2 ? this.user : this.comp;

        if (this.collisionDetection(this.ball, player)) {
            this.hit.play();

            const playerCenter = player.y + player.height / 2;
            const collidePoint = this.ball.y - playerCenter;
            const normalizedCollidePoint = collidePoint / (player.height / 2);
            const angle = normalizedCollidePoint * (Math.PI / 4);

            const direction = this.ball.x < this.canvas.width / 2 ? 1 : -1;

            this.ball.velocityX = this.ball.speed * Math.cos(angle) * direction;
            this.ball.velocityY = this.ball.speed * Math.sin(angle);
            this.ball.speed += 0.5;
        }
    }

    resetBall() {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
        this.ball.speed = 7;
        this.ball.velocityX = -this.ball.velocityX;
    }

    updateScore() {
        const ballLeftSide = this.ball.x - this.ball.radius;
        const ballRightSide = this.ball.x + this.ball.radius;

        if (ballLeftSide < 0) {
            this.comp.score++;
            this.compScoreSound.play();
            this.resetBall();
        } else if (ballRightSide > this.canvas.width) {
            this.user.score++;
            this.userScoreSound.play();
            this.resetBall();
        }
    }

    updateGame() {
        this.ball.x += this.ball.velocityX;
        this.ball.y += this.ball.velocityY;

        const compLevel = 0.025;
        this.comp.y += (this.ball.y - (this.comp.y + this.comp.height / 2)) * compLevel;

        const ballBottom = this.ball.y + this.ball.radius;
        const ballTop = this.ball.y - this.ball.radius;

        if (ballBottom > this.canvas.height || ballTop < 0) {
            this.ball.velocityY = -this.ball.velocityY;
            this.wall.play();
        }

        this.afterCollision();
        this.updateScore();
    }

    renderGame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawCanvasBG();
        this.net.draw(this.ctx);
        this.user.draw(this.ctx);
        this.comp.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.drawText(this.canvas.width / 4, this.canvas.height / 5, this.user.score, this.user.color);
        this.drawText(3 * this.canvas.width / 4, this.canvas.height / 5, this.comp.score, this.comp.color);
    }

    gameAnimation() {
        this.updateGame();
        this.renderGame();
    }
}


new Canvas();
