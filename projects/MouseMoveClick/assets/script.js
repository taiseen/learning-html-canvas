/*
 * 21 - Sep - 2023
 *
 * 1) Mouse move event and circle drawing effect... 
 * 2) Mouse click event and circle drawing effect... 
 * 3) Browser window resize event and canvas resize itself width & height
 * 
*/

class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.cWidth = this.canvas.width = window.innerWidth * .9;
        this.cHeight = this.canvas.height = window.innerHeight * .9;

        this.mouse = {
            x: undefined,
            y: undefined,
            isClick: false,
        }

        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('resize', this.handleWindowResize);
        window.addEventListener('click', this.handleClick);
        this.startAnimation();
    }

    handleMouseMove = (e) => {
        const canvasRect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.x - canvasRect.left;
        this.mouse.y = e.y - canvasRect.top;
        this.mouse.isClick = false;
    }

    handleClick = e => {
        this.mouse.isClick = true;
        this.drawCircle(this.context)
    };

    handleWindowResize = e => {
        this.cWidth = this.canvas.width = window.innerWidth * .9;
        this.cHeight = this.canvas.height = window.innerHeight * .9;
    }

    drawCircle(context) {

        const circleSize = this.mouse.isClick ? 20 : 30;

        this.mouse.isClick
            ? context.fillStyle = 'tomato'
            : context.strokeStyle = 'gray';

        context.beginPath();
        context.arc(this.mouse.x, this.mouse.y, circleSize, 0, Math.PI * 2);

        // this.mouse.isClick
        //     ? context.fillRect(this.mouse.x - circleSize / 2, this.mouse.y - circleSize / 2, circleSize, circleSize)
        //     : context.arc(this.mouse.x, this.mouse.y, circleSize, 0, Math.PI * 2);

        this.mouse.isClick
            ? context.fill()
            : context.stroke();

        context.closePath();
    }

    startAnimation = () => {
        // this.context.clearRect(0, 0, this.cWidth, this.cHeight); // clear all previous frames...

        this.drawCircle(this.context);

        requestAnimationFrame(this.startAnimation);
    }
}

window.addEventListener('load', () => new Canvas());