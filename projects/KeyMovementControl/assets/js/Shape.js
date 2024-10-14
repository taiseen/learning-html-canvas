class Shape {
    constructor(cWidth, cHeight, ctx) {
        this.ctx = ctx
        this.canvasHeight = cHeight;
        this.canvasWidth = cWidth;
        this.centerY = this.canvasHeight / 2; // Calculate the y-coordinate for the center of the canvas
        this.centerX = this.canvasWidth / 2; // Calculate the x-coordinate for the center of the canvas

        this.movingSpeed = 30; // Reduced the speed for smoother animation
        this.rectangle = 90;
        this.radius = 100;
        this.xAxis = 0;
        this.yAxis = 0;

        this.strokeColor = '#CCC';
        this.lineWidth = 2;
    }

    drawRectangle() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.xAxis, this.yAxis, this.rectangle, this.rectangle); // x, y, width, height
    }

    drawCircle() {
        this.ctx.fillStyle = 'tomato';
        this.ctx.beginPath(); // if not use this method, then previous frame won't clear...
        this.ctx.arc(this.xAxis + this.radius, this.yAxis + this.radius, this.radius, 0, Math.PI * 2, false); // x , y , radius/size , start angle , end angle , direction
        this.ctx.fill(); // to draw the circle...
        // ctx.strokeStyle = 'tomato'; // stroke properties
        // ctx.lineWidth = 5; // stroke properties
        // ctx.stroke(); // stroke draw method
        // ctx.closePath();
    }

    drawText() {
        const text = 'Hello';
        this.ctx.fillStyle = 'orange';
        this.ctx.font = '50px Arial';
        this.ctx.fillText(text, 600, 200);
    }

    drawVerticalLine() {
        // Set the line color and thickness
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineWidth = this.lineWidth;

        // Draw the vertical line
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, 0); // x , y --> Define the starting and ending points for the vertical line
        this.ctx.lineTo(this.centerX, this.canvasHeight); // Bottom of the canvas
        this.ctx.stroke();
    }

    drawHorizontalLine() {
        // Set the line color and thickness
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineWidth = this.lineWidth;

        // Draw the vertical line
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.centerY); // x , y --> Define the starting and ending points for the vertical line
        this.ctx.lineTo(this.canvasWidth, this.centerY);
        this.ctx.stroke();
    }

    drawGrid() {
        // Set the line color and thickness
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = .5;

        const space = 30;

        const drawLine = (startX, startY, endX, endY) => {
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
        };

        for (let row = 0; row < this.canvasHeight; row += space) {
            drawLine(0, row, this.canvasWidth, row); // horizontal ➖➖➖ Line's...
        }

        for (let col = 0; col < this.canvasWidth; col += space) {
            drawLine(col, 0, col, this.canvasHeight); // vertical ||| Line's...
        }
    }

    shapeMoveByKey(KeyCode) {
        switch (KeyCode) {

            case 'KeyW':
            case 'ArrowUp':
                if (this.yAxis > 0) this.yAxis -= this.movingSpeed;
                break;

            case 'KeyS':
            case 'ArrowDown':
                if (this.canvasHeight - this.rectangle > this.yAxis + this.movingSpeed) this.yAxis += this.movingSpeed;
                break;

            case 'KeyA':
            case 'ArrowLeft':
                if (this.xAxis > 0) this.xAxis -= this.movingSpeed;
                break;

            case 'KeyD':
            case 'ArrowRight':
                if (this.canvasWidth - this.rectangle > this.xAxis + this.movingSpeed) this.xAxis += this.movingSpeed;
                break;

            default:
                console.log(KeyCode);
                break;
        }
    }
}

export default Shape;

