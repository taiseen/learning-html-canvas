import Enemy from "./Enemy.js";

class HiveWhale extends Enemy {
    constructor(game) {
        super(game); // at 1st, merge parent properties also...
        this.width = 400; // img single unit 
        this.height = 227; // img single unit 

        this.y = Math.random() * (this.game.height * .95 - this.height); // random height with 95% game height

        this.img = document.getElementById('hiveWhale');
        this.enemyFrameY = 0;

        this.lives = 15;
        this.score = this.lives; // score point
        this.type = 'hiveWhale';

        this.speedX = Math.random() * -1.2 - .2;
    }
}

export default HiveWhale;