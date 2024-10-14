const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cWidth = canvas.width = 800;
const cHeight = canvas.height = 500;


class Shape {
    constructor(ctx, x, y, r, s) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = s;
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
        this.hitCount = 0;
        this.xyDirection = 'x+ y+'
    }

    drawRect() {
        // text...
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.xyDirection, this.x + this.r / 2, this.y + this.r / 2);

        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = 'black';

        // rectangle...
        this.ctx.strokeRect(this.x, this.y, this.r, this.r);
    }

    drawCircle() {
        // text...
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.hitCount, this.x, this.y);

        // circle...
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        this.ctx.stroke();
    }

    updateRectangle() {
        this.drawRect();

        // for rectangle ==> 🟩🟩🟩
        // its size calculation...
        const rTop = this.y;
        const rBottom = this.y + this.r;
        const rLeft = this.x;
        const rRight = this.x + this.r;

        // for rectangle ==> 🟩🟩🟩
        // canvas boundary collision... & change direction
        // if (rTop < 0 || rBottom > cHeight) {
        //     this.dy = -this.dy;
        //     this.xyDirection = 'x+ y-';
        // } else if (rLeft < 0 || rbRight > cWidth) {
        //     this.dx = -this.dx;
        //     this.xyDirection = 'x- y-';
        // }


        if (rTop < 0) {
            this.dy = -this.dy;
            this.xyDirection = 'y+';
        } else if (rBottom > cHeight) {
            this.dy = -this.dy;
            this.xyDirection = 'y-';
        } else if (rLeft < 0) {
            this.dx = -this.dx;
            this.xyDirection = 'x+';
        } else if (rRight > cWidth) {
            this.dx = -this.dx;
            this.xyDirection = 'x-';
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    updateRectangleCord() {
        this.drawRect();

        // for rectangle ==> 🟩🟩🟩
        // its size calculation...
        const rTop = this.y;
        const rBottom = this.y + this.r;
        const rLeft = this.x;
        const rRight = this.x + this.r;

        // for rectangle ==> 🟩🟩🟩
        // canvas boundary collision... & change direction
        // if (rTop < 0 || rBottom > cHeight) {
        //     this.dy = -this.dy;
        //     this.xyDirection = 'x+ y-';
        // } else if (rLeft < 0 || rbRight > cWidth) {
        //     this.dx = -this.dx;
        //     this.xyDirection = 'x- y-';
        // }


        if (rTop < 0) {
            this.dy = -this.dy;
        } else if (rBottom > cHeight) {
            this.dy = -this.dy;
        } else if (rLeft < 0) {
            this.dx = -this.dx;
        } else if (rRight > cWidth) {
            this.dx = -this.dx;
        }

        if (rRight < cWidth / 2 && rTop < cHeight / 2) {
            this.xyDirection = 'x- y-';

            // // Draw the half vertical line
            // ctx.beginPath();
            // ctx.moveTo(cWidth / 2, 0); // x , y --> Define the starting and ending points for the vertical line
            // ctx.lineTo(cWidth / 2, cHeight / 2); // Bottom of the canvas
            // ctx.stroke();

            // // Draw the half horizontal line
            // ctx.beginPath();
            // ctx.moveTo(0, cHeight / 2); // x , y --> Define the starting and ending points for the vertical line
            // ctx.lineTo(cWidth / 2, cHeight / 2); // Bottom of the canvas
            // ctx.stroke();
        }
        if (rRight > 3 * cWidth / 4 && rTop > cHeight / 4) {
            this.xyDirection = 'x+ y-';
        }

        if (rLeft > 3 * cWidth / 4 && rBottom > 3 * cHeight / 4) {
            this.xyDirection = 'x+ y+';

            // // Draw the half vertical line
            // ctx.beginPath();
            // ctx.moveTo(cWidth / 2, cHeight / 2); // x , y --> Define the starting and ending points for the vertical line
            // ctx.lineTo(cWidth / 2, cHeight); // Bottom of the canvas
            // ctx.stroke();

            // // Draw the half horizontal line
            // ctx.beginPath();
            // ctx.moveTo(cWidth / 2, cHeight / 2); // x , y --> Define the starting and ending points for the vertical line
            // ctx.lineTo(cWidth, cHeight / 2);
            // ctx.stroke();
        }

        if (rLeft < cWidth / 4 && rBottom < 3 * cHeight / 4) {
            this.xyDirection = 'x- y+';
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    updateCircle() {
        this.drawCircle();

        // for circle ==> 🟢🟢🟢
        // its size calculation...
        const cTop = this.y - this.r;
        const cBottom = this.y + this.r;
        const cLeft = this.x - this.r;
        const cRight = this.x + this.r;

        // for circle ==> 🟢🟢🟢
        // canvas boundary collision... & change direction
        if (cTop < 0 || cBottom > cHeight) {
            this.dy = -this.dy;
            this.hitCount++;
        } else if (cLeft < 0 || cRight > cWidth) {
            this.dx = -this.dx;
            this.hitCount++;
        }

        this.x += this.dx;
        this.y += this.dy;
    }
}

const speed = 1.5;
const rSize = 100;

const rectangle = new Shape(ctx, (cWidth - rSize) / 2, (cHeight - rSize) / 2, rSize, speed);
const circle = new Shape(ctx, Math.random() * cWidth, Math.random() * cHeight, 50, 2);


const startAnimation = () => {
    ctx.clearRect(0, 0, cWidth, cHeight); // clear all previous frames...

    // rectangle.updateRectangleCord();
    rectangle.updateRectangle();
    // circle.updateCircle();


    ctx.lineWidth = .5

    // Draw the vertical line
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(cWidth / 2, 0); // x , y --> Define the starting and ending points for the vertical line
    ctx.lineTo(cWidth / 2, cHeight); // Bottom of the canvas
    ctx.stroke();

    // Draw the horizontal line
    // ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(0, cHeight / 2); // x , y --> Define the starting and ending points for the vertical line
    ctx.lineTo(cWidth, cHeight / 2); // Bottom of the canvas
    ctx.stroke();

    ctx.fillText('x- y-', cWidth / 4, cHeight / 4);
    ctx.fillText('x+ y-', 3 * cWidth / 4, cHeight / 4);
    ctx.fillText('x+ y+', 3 * cWidth / 4, 3 * cHeight / 4);
    ctx.fillText('x- y+', cWidth / 4, 3 * cHeight / 4);


    requestAnimationFrame(startAnimation);
}

startAnimation();

// const allShape = [];
// const shape = (obj) => obj.drawCircle();

// for (let i = 0; i < 10; i++) {
//     const x = Math.random() * cWidth;
//     const y = Math.random() * cHeight;

//     allShape.push(new Shape(ctx, x, y, 30));

//     shape(allShape[i])
// }