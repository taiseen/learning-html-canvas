import Game from "./Game.js";

class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = 800;
        this.canvas.height = 500;
        this.game = new Game(this.canvas.width, this.canvas.height);

        // Bind the animation method to the current instance
        this.animation = this.animation.bind(this);

        // Start the animation loop
        this.animation();
    }

    // animation = () => {  <== without .bind(this) /// arrow method also work 
    animation() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.game.draw(this.context);
        this.game.update();

        requestAnimationFrame(this.animation);
    }
}

window.addEventListener('load', () => new Canvas());
