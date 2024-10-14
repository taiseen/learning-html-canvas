class Particle {
    constructor(effect, xPixelData, yPixelData, pixelColor) {
        this.effect = effect;
        this.xAxis = Math.random() * this.effect.canvasWidth; // calculate particle x position
        this.yAxis = 0; // calculate particle y position
        this.originX = Math.floor(xPixelData);
        this.originY = Math.floor(yPixelData);
        this.pixelSize = this.effect.pixelGap - 1; // current pixel size smaller 1 pixel...
        this.pixelColor = pixelColor;
        
        // animation helper variables...
        this.vx = 0; // velocity, x axis speed
        this.vy = 0; // velocity, y axis speed
        this.ease = 0.04; // animation speed...
        this.dx = 0; // distance x
        this.dy = 0; // distance y
        this.force = 0;
        this.angle = 0;
        this.distance = 0; // total distance
        this.friction = .95;
    }

    rectanglePixelDraw(context) {
        // draw squares or small particles/pixels...
        context.fillStyle = this.pixelColor;
        context.fillRect(this.xAxis, this.yAxis, this.pixelSize, this.pixelSize); // x , y , width , height
    }

    update() {
        // Physics calculation...
        // to calculate a distance between two points we can use Pythagorean theorem...
        // so this give us distance between two points of particle/pixel & mouse...
        this.dx = this.effect.mouse.x - this.xAxis; // distance x
        this.dy = this.effect.mouse.y - this.yAxis; // distance y
        this.distance = this.dx * this.dx + this.dy * this.dy; // Math.sqrt expensive operation...
        this.force = -this.effect.mouse.radius / this.distance;

        // Physics calculation....
        if (this.distance < this.effect.mouse.radius) {
            this.angle = Math.atan2(this.dy, this.dx);
            this.vx += this.force * Math.cos(this.angle);
            this.vy += this.force * Math.sin(this.angle);
        }

        this.xAxis += (this.vx *= this.friction) + (this.originX - this.xAxis) * this.ease;
        this.yAxis += (this.vy *= this.friction) + (this.originY - this.yAxis) * this.ease;
    }

    pixelEffect() {
        // by user click this effect happens on the canvas...
        this.xAxis = Math.random() * this.effect.canvasWidth; // calculate particle x position
        this.yAxis = Math.random() * this.effect.canvasHeight; // calculate particle y position
        this.ease = 0.2; // animation speed...
    }
}

export default Particle;