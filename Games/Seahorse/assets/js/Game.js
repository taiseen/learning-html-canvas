import InputHandler from "./InputHandler.js";
import Player from "./Player.js";

// All logic come together... || Brain of this project...
class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.keyBoardInput = new InputHandler(this);
        this.keyPress = []; // always track user key press... & its available in all our code base...
        this.key = {
            up: 'ArrowUp',
            down: 'ArrowDown',
            enter: 'Enter',
            space: ' ',
            debugMode: 'd',
        }
        this.ammo = 20;
    }

    // focus on ==> static...
    draw(context) {
        this.player.draw(context);
    }

    // focus on ==> dynamic... 
    update() {
        this.player.update();
    }
}

export default Game;
