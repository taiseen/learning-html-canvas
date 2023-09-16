import Player from "./Player.js";

// All logic come together... || Brain of this project...
class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
    }

    draw(context) {
        this.player.draw(context);
    }

    update() {
        this.player.update();
    }
}

export default Game;
