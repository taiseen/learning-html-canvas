// player will be shooting lesser... at enemies...
class Bullet {
    constructor(game, x, y) {
        this.game = game;
        this.x = x; // depends on current player x position...
        this.y = y; // depends on current player y position...
        this.width = 14;
        this.height = 7;
        this.speed = 3;
        this.markedForDeletion = false; // flag for delete this obj from game...
        this.bullet = document.getElementById('bullet');
    }

    // focus on ==> static...
    draw(context) {
        context.fillStyle = 'orange';
        context.drawImage(this.bullet, this.x, this.y, this.width, this.height);
    }

    // focus on ==> dynamic... 
    update() {
        this.x += this.speed; // increase horizontal x coordinate for movement... 

        // if move across the 80% game/canvas area, then delete it...
        if (this.x > this.game.width * .8) this.markedForDeletion = true;
    }
}

export default Bullet;