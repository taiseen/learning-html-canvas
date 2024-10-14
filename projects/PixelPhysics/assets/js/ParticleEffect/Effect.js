import Particle from "./Particle.js";

class Effect {
    constructor(cWidth, cHeight) {
        this.image = document.getElementById('image'); // get img from DOM element
        this.canvasWidth = cWidth; // canvas width
        this.canvasHeight = cHeight; // canvas height
        this.centerX = this.canvasWidth * .5;  // center X position inside canvas
        this.centerY = this.canvasHeight * .5; // center Y position inside canvas 
        this.centerImgX = this.centerX - this.image.width * .5; // center image at X position inside canvas
        this.centerImgY = this.centerY - this.image.height * .5; // center image at Y position inside canvas
        this.particlesArray = []; // store all active particles/pixels object
        this.pixelGap = 3;
        this.mouse = {
            radius: 3000, // how large the circle area...
            x: undefined,
            y: undefined,
        };
        // for tracking mouse cursor/pointer...
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x; // set mouse x coordinate 
            this.mouse.y = e.y; // set mouse y coordinate 
        });
    }

    init(context) {
        // const numberOfParticles = 500;
        // // draw number of particles by this loop...
        // for (let i = 0; i < numberOfParticles; i++) {
        //     this.particlesArray.push(new Particle(this));
        // }

        context.drawImage(this.image, this.centerImgX, this.centerImgY); // imgData , x , y , width , height

        const canvasTotalPixelsData = context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;

        const rgbaSize = 4;

        // traverse start:- through entire canvas pixels as a grid...
        for (let row = 0; row < this.canvasWidth; row += this.pixelGap) {
            for (let col = 0; col < this.canvasHeight; col += this.pixelGap) {

                const index = (col * this.canvasWidth + row) * rgbaSize;

                const alpha = canvasTotalPixelsData[index + 3];

                if (alpha > 0) {
                    const r = canvasTotalPixelsData[index]; // red 
                    const g = canvasTotalPixelsData[index + 1]; // green
                    const b = canvasTotalPixelsData[index + 2]; // blue

                    const pixelRgbColor = `rgb(${r}, ${g}, ${b})`;

                    this.particlesArray.push(new Particle(this, row, col, pixelRgbColor));
                }
            }
        }
        // traverse end:- here...
    }

    pixelDraw(context) {
        this.particlesArray.forEach(particle => particle.rectanglePixelDraw(context));
    }

    update() {
        this.particlesArray.forEach(particle => particle.update());
    }

    buttonClickPixelEffect() {
        this.particlesArray.forEach(particle => particle.pixelEffect());
    }

    responsiveCanvas(width, height) {
        this.canvasWidth = width; // canvas width
        this.canvasHeight = height; // canvas height
    }
}

export default Effect;
