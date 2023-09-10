class Paddle {
    constructor(ctx, x, canvasHeight) {
        this.ctx = ctx;
        this.x = x;
        this.y = (canvasHeight - 200) / 2;
        this.width = 20;
        this.height = 200;
        this.color = '#DDD';
        this.score = 0;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Paddle;
