// Main Character
class Player {
    constructor(game) {
        this.game = game;
        this.width = 120;
        this.height = 190;
        this.x = 10;
        this.y = 0;
        this.speedY = 1;
    }

    // for player [static] drawing inside canvas...
    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    // for player [dynamically] moving inside canvas...
    update() {
        this.y += this.speedY;
    }
}

export default Player;