class Ball {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.radius = 30;
        this.speed = 7;
        this.velocityX = 5;
        this.velocityY = 5;
        this.color = '#DDD';
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }
}

export default Ball;
