import Enemy from "./Enemy.js";

class Lucky extends Enemy {
    constructor(game) {
        super(game); // at 1st, merge parent properties also...
        this.width = 99; // img single unit 
        this.height = 95; // img single unit 

        this.y = Math.random() * (this.game.height * .9 - this.height); // random height with 90% game height

        this.lives = 3;
        this.score = 15; // score point
        this.type = 'lucky';

        this.img = document.getElementById('lucky');
        this.enemyFrameY = Math.floor(Math.random() * 2);
    }
}

export default Lucky;