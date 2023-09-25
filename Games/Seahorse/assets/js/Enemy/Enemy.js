// Blueprint for handle many type of enemy's...
class Enemy {
    constructor(game) {
        this.game = game;
        this.x = this.game.width;
        this.speedX = Math.random() * -1.5 - .5;
        this.markedForDeletion = false;

        this.enemyFrameX = 0;
        this.enemyFrameY = 0;
        this.enemyMaxFrame = 37;
    }

    draw(context) {
        if (this.game.debugMode) {
            context.font = '20px Arial';
            context.fillText(this.lives, this.x, this.y);
            context.strokeRect(this.x, this.y, this.width, this.height);
        }

        context.drawImage(
            this.img,
            this.enemyFrameX * this.width,
            this.enemyFrameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update() {
        this.x += this.speedX - this.game.speed; // direction update continually

        if (this.x + this.width < 0) this.markedForDeletion = true;

        // update enemy image positions... like animation
        this.enemyFrameX < this.enemyMaxFrame
            ? this.enemyFrameX++
            : this.enemyFrameX = 0

    }
}

export default Enemy;
