// 17 - Sep - 2023

import Game from "./Game/Game.js";

class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = 1100;
        this.canvas.height = 500;
        this.game = new Game(this.canvas.width, this.canvas.height);

        this.lastTime = 0;

        // Bind the animation method to the current instance
        this.animation = this.animation.bind(this);

        // Start the animation loop
        this.animation(0); // for timeStamp pass 0 as args...

        // form browser access - source code security...
        document, addEventListener('contextmenu', this.handelRightClick);
        document, addEventListener('keydown', this.handelKeyPress);
    }

    // animation = () => {  <== without .bind(this) /// arrow method also work 
    animation(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        // different in millisecond 
        // between this & previous loop steps...
        // 1000 ms (1s) / 16 (deltaTime) == 60 FPS (Frame Per Second)
        // (deltaTime) millisecond it take to render 1 animation frame... 
        // to run 1 animation loop...

        this.lastTime = timeStamp;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.game.draw(this.context);
        this.game.update(deltaTime); // for run periodic event in game...

        requestAnimationFrame(this.animation);
    }

    handelRightClick = (e) => e.preventDefault();   // prevent mouse right click || context menu click..
    handelKeyPress = (e) => {                       // prevent key board shortcut...
        if (e.ctrlKey || e.keyCode === 123) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
}

window.addEventListener('load', () => new Canvas());
