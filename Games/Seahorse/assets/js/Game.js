import InputHandler from "./InputHandler.js";
import Player from "./Player.js";
import UI from "./UI.js";

// All logic come together... || Brain of this project...
class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        // objects call...
        this.player = new Player(this);
        this.keyBoardInput = new InputHandler(this);
        this.ui = new UI(this);

        // tracking key press...
        this.keyPress = []; // always track user key press... & its available in all our code base...
        this.key = {
            up: 'ArrowUp',
            down: 'ArrowDown',
            enter: 'Enter',
            space: ' ',
            debugMode: 'd',
        }

        // for lesser bullet...
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 500; // half second...
    }

    // focus on ==> static...
    draw(context) {
        this.player.draw(context);
        this.ui.draw(context);
    }

    // focus on ==> dynamic... 
    update(deltaTime) {
        this.player.update();

        // for lesser bullet amount control...
        if (this.ammoTimer > this.ammoInterval) {
            if (this.maxAmmo > this.ammo) this.ammo++;
            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime;
        }
    }
}

export default Game;
