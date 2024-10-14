class Shape {
    constructor(ctx, x, y, r) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = r;
        this.rectangleSize = 50;
        this.speed = 5;
    }

    drawCircle() {
        // this.ctx.fillStyle = `hsl(${Math.random() * 500}, 100%, 50%)`
        this.ctx.strokeStyle = `hsl(${Math.random() * 500}, 100%, 50%)`;

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawRectangle(text) {
        // this.ctx.fillStyle = `hsl(${Math.random() * 500}, 100%, 50%)`
        // this.ctx.fillRect(this.x, this.y, this.rectangleSize, this.rectangleSize);
        this.ctx.strokeStyle = `hsl(${Math.random() * 500}, 100%, 50%)`;
        this.ctx.strokeRect(this.x, this.y, this.rectangleSize, this.rectangleSize);

        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, this.x + this.rectangleSize / 2, this.y + this.rectangleSize / 2);
    }

    drawText(text) {
        this.text = text;
        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.text, this.x, this.y);
    }
}

export default Shape;