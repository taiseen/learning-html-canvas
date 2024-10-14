// 7 - Sep - 2023
import Shape from "./Shape.js";

class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.cWidth = this.canvas.width = 800;
        this.cHeight = this.canvas.height = 500;

        // this.justDraw();
        this.startAnimation();
    }

    startAnimation = () => {
        this.ctx.clearRect(0, 0, this.cWidth, this.cHeight); // clear all previous frames...

        this.ctx.strokeRect(50, 50, 50, 50);

        requestAnimationFrame(this.startAnimation);
    }

    justDraw() {
        const allCircles = [];

        const draw = (circleObj, num) => {
            // circleObj?.drawRectangle(num + 1);
            circleObj?.drawCircle();
            circleObj?.drawText(num + 1);
        }

        for (let i = 0; i < 10; i++) {
            const cRadius = 40;
            const x = Math.floor(Math.random() * (this.cWidth - 2 * cRadius) + cRadius); // draw inside canvas x boundary
            const y = Math.floor(Math.random() * (this.cHeight - 2 * cRadius) + cRadius); // draw inside canvas y boundary

            allCircles.push(new Shape(this.ctx, x, y, cRadius));

            draw(allCircles[i], i);
        }

        // const minRadius = 20;
        // const maxRadius = 40;

        // for (let i = 0; i < 10; i++) {
        //     const cRadius = Math.random() * (maxRadius - minRadius) + minRadius;
        //     const x = Math.random() * (this.cWidth - 2 * cRadius) + cRadius;
        //     const y = Math.random() * (this.cHeight - 2 * cRadius) + cRadius;

        //     // Check for overlap with existing circles
        //     const overlaps = allCircles.some((circle) => {
        //         const dx = circle.x - x;
        //         const dy = circle.y - y;
        //         const distance = Math.sqrt(dx * dx + dy * dy);
        //         return distance < circle.r + cRadius;
        //     });

        //     if (!overlaps) {
        //         allCircles.push(new Shape(this.ctx, x, y, cRadius));
        //         draw(allCircles[i], i);
        //     }
        // }
    }
}

new Canvas();