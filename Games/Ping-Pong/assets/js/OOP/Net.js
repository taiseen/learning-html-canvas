class Net {
    constructor(ctx, canvasWidth) {
        this.ctx = ctx;
        this.x = (canvasWidth - 2) / 2;
        this.y = 0;
        this.width = 2;
        this.height = 4;
        this.color = '#DDD';
    }

    draw() {
        for (let i = 0; i <= canvas.height; i += 10) {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x, this.y + i, this.width, this.height);
        }
    }
}

export default Net;