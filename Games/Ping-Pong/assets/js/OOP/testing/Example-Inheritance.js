class GameObject {
    constructor(x, y, width, height, color, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Paddle extends GameObject {
    constructor(x, canvasHeight, ctx) {
        super(x, (canvasHeight - 200) / 2, 20, 200, '#DDD', ctx);
        this.score = 0;
    }
}

class Ball extends GameObject {
    constructor(canvasWidth, canvasHeight, ctx) {
        super(canvasWidth / 2, canvasHeight / 2, 30, 30, '#DDD', ctx);
        this.speed = 7;
        this.velocityX = 5;
        this.velocityY = 5;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }
}

class Net extends GameObject {
    constructor(canvasWidth, ctx) {
        super((canvasWidth - 2) / 2, 0, 2, 4, '#DDD', ctx);
    }

    draw() {
        for (let i = 0; i <= this.ctx.canvas.height; i += 10) {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x, this.y + i, this.width, this.height);
        }
    }
}

class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1000;
        this.canvas.height = 600;

        this.user = new Paddle(0, this.canvas.height, this.ctx);
        this.comp = new Paddle(this.canvas.width - 20, this.canvas.height, this.ctx);
        this.ball = new Ball(this.canvas.width, this.canvas.height, this.ctx);
        this.net = new Net(this.canvas.width, this.ctx);

        // ... (rest of your code remains the same)
    }

    // ... (rest of your methods and properties remain the same)
}

const game = new Game('canvas');
