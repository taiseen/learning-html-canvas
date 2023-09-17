import ProjectTile from "./ProjectTile.js";

// Main Character
class Player {
    constructor(game) {
        this.game = game;
        this.width = 120;
        this.height = 190;
        this.x = 10;
        this.y = 10;
        this.speedY = 1;
        this.maxSpeed = 5;
        this.projectTiles = [];
    }

    // for player [static] drawing inside canvas...
    draw(context) {
        context.fillStyle = 'black';
        context.strokeRect(this.x, this.y, this.width, this.height);

        // draw static ==> shooting lesser...
        this.projectTiles.forEach(shoot => shoot.draw(context));
    }

    // for player [dynamically] moving inside canvas...
    update() {
        // direction change... by pressing key from keyBoard...
        if (this.game.keyPress.includes(this.game.key.up)) this.speedY = -this.maxSpeed;
        else if (this.game.keyPress.includes(this.game.key.down)) this.speedY = this.maxSpeed;
        else this.speedY = 0; // if not write this statement, then player always moving... non stop...

        // this.speedY = this.game.keyPress.includes(this.game.key.up)
        //     ? -this.maxSpeed
        //     : this.game.keyPress.includes(this.game.key.down)
        //         ? this.maxSpeed
        //         : 0;

        this.y += this.speedY; // by looping, this run always... very important line

        // handle dynamic ==> player shooting leaser...
        this.projectTiles.forEach(shoot => shoot.update());
        this.projectTiles = this.projectTiles.filter(shoot => !shoot.markForDeletion);

    }

    // by user key press event, fire/call this method()...
    shootTop() {
        if (this.game.ammo > 0) {
            this.projectTiles.push(new ProjectTile(this.game, this.x, this.y));
            this.game.ammo--;
        }
    }
}

export default Player;