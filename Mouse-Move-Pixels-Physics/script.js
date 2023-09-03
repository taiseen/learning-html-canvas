// 3 - Sep - 2023
// img to digital art work...

window.addEventListener('load', () => {

    const button = document.getElementById('btn');
    const canvas = document.getElementById('htmlCanvas');
    const ctx = canvas.getContext('2d');

    const cWidth = canvas.width = window.innerWidth;
    const cHeight = canvas.height = window.innerHeight;


    // ###############################################################################################
    // ###############################################################################################
    // ###############################################################################################
    class Particle {
        constructor(effect, xPixelData, yPixelData, pixelColor) {
            this.effect = effect;
            this.xAxis = Math.random() * this.effect.canvasWidth; // calculate particle x position
            this.yAxis = 0; // calculate particle y position
            this.originX = Math.floor(xPixelData);
            this.originY = Math.floor(yPixelData);
            this.pixelColor = pixelColor;
            this.pixelSize = this.effect.pixelGap - 1; // current pixel size smaller 1 pixel...
            this.vx = 0; // velocity, x axis speed
            this.vy = 0; // velocity, y axis speed
            this.ease = 0.04; // animation speed...
        }

        draw(context) {
            // draw black squares or small particles/pixels...
            context.fillStyle = this.pixelColor;
            context.fillRect(this.xAxis, this.yAxis, this.pixelSize, this.pixelSize); // x , y , width , height
        }

        update() {
            this.xAxis += (this.originX - this.xAxis) * this.ease;
            this.yAxis += (this.originY - this.yAxis) * this.ease;
        }

        pixelEffect() {
            // by user click this effect happens on the canvas...
            this.xAxis = Math.random() * this.effect.canvasWidth; // calculate particle x position
            this.yAxis = Math.random() * this.effect.canvasHeight; // calculate particle y position
            this.ease = 0.2; // animation speed...
        }
    }

    // ###############################################################################################
    // ###############################################################################################
    // ###############################################################################################
    class Effect {
        constructor(cWidth, cHeight) {
            this.image = document.getElementById('image'); // get img from DOM element
            this.canvasWidth = cWidth; // canvas width
            this.canvasHeight = cHeight; // canvas height
            this.centerX = cWidth * .5;  // center X position inside canvas
            this.centerY = cHeight * .5; // center Y position inside canvas 
            this.centerImgX = this.centerX - this.image.width * .5; // center image at X position inside canvas
            this.centerImgY = this.centerY - this.image.height * .5; // center image at Y position inside canvas
            this.particlesArray = []; // content all the active particlh5es objects
            this.pixelGap = 3;
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
            for (let col = 0; col < this.canvasHeight; col += this.pixelGap) {
                for (let row = 0; row < this.canvasWidth; row += this.pixelGap) {

                    const index = (col * this.canvasWidth + row) * rgbaSize;

                    const r = canvasTotalPixelsData[index]; // red 
                    const g = canvasTotalPixelsData[index + 1]; // green
                    const b = canvasTotalPixelsData[index + 2]; // blue
                    const a = canvasTotalPixelsData[index + 3]; // alpha

                    const pixelRgbColor = `rgb(${r}, ${g}, ${b})`;

                    if (a > 0) {
                        this.particlesArray.push(new Particle(this, row, col, pixelRgbColor));
                    }
                }
            }
            // traverse end:- here...
        }

        draw(context) {
            this.particlesArray.forEach(particle => particle.draw(context));
        }

        update() {
            this.particlesArray.forEach(particle => particle.update());
        }

        buttonClickPixelEffect() {
            this.particlesArray.forEach(particle => particle.pixelEffect());
        }
    }

    // ###############################################################################################
    // ###############################################################################################
    // ###############################################################################################

    const effect = new Effect(cWidth, cHeight);
    effect.init(ctx);

    const animation = () => {
        ctx.clearRect(0, 0, cWidth, cHeight); // clear previous all frames from canvas

        effect.draw(ctx)
        effect.update()

        requestAnimationFrame(animation); // 60 frames per second...
    };

    animation();

    button.addEventListener('click', () => {
        effect.buttonClickPixelEffect();
    });
});