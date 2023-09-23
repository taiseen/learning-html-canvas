import Bullet from "./Bullet.js";

// Main Character
class Player {
    constructor(game) {
        this.game = game;
        this.width = 120;   // player width
        this.height = 190;  // player height
        this.x = 10;        // player x position
        this.y = 120;       // player y position
        this.speedY = 1;
        this.maxSpeed = 5;

        this.playerImg = document.getElementById('player');
        this.playerFrameX = 0;
        this.playerFrameY = 0;
        this.playerMaxFrame = 37;

        this.bullets = []; // create a holder to hold all bullets {objects}...

    }

    // for player [static] drawing inside canvas...
    draw(context) {
        if (this.game.debugMode) {
            context.strokeStyle = 'red';
            context.strokeRect(this.x, this.y, this.width, this.height);
        }

        context.drawImage(
            this.playerImg,
            this.playerFrameX * this.width,
            this.playerFrameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );

        // draw static ==> shooting lesser...
        this.bullets.forEach(shoot => shoot.draw(context));
    }

    // for player [dynamically] moving inside canvas... || manipulating/change property values...
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

        this.y += this.speedY; // by 🔄️ looping, this run always... very important line

        // handle dynamic ==> player shooting leaser...
        this.bullets.forEach(shoot => shoot.update());
        this.bullets = this.bullets.filter(shoot => !shoot.markForDeletion); // update bullets holder, by removing bullets...

        // player image frameX movement...
        this.playerFrameX < this.playerMaxFrame
            ? this.playerFrameX++
            : this.playerFrameX = 0;

    }

    // by user key press event, fire/call this method()...
    shootTop() {
        if (this.game.ammo > 0) {
            this.bullets.push(new Bullet(this.game, this.x, this.y)); // store bullet {object's} into bullets holder
            this.game.ammo--;

            // this.game.audio.play();
        }
    }
}

export default Player;