// Blueprint for handle many type of enemy's...
class Enemy {
    constructor(game) {
        this.game = game;
        this.x = this.game.width;
        this.speedX = Math.random() * -1.5 - .5;
        this.markedForDeletion = false;
        this.lives = 5;
        this.score = this.lives;
    }

    draw(context) {
        context.fillStyle = 'red';
        context.strokeRect(this.x, this.y, this.width, this.height);

        context.fillStyle = 'black';
        context.font = '20px Arial';
        context.fillText(this.lives, this.x, this.y);

    }

    update() {
        this.x += this.speedX; // direction update continually
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
}

export default Enemy;
