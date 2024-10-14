import Enemy from "./Enemy.js";

class Lucky extends Enemy {
    constructor(game) {
        super(game); // at 1st, merge parent properties also...
        this.width = 99; // img single unit 
        this.height = 95; // img single unit 

        this.y = Math.random() * (this.game.height * .95 - this.height); // random height with 95% game height

        this.img = document.getElementById('lucky');
        this.enemyFrameY = Math.floor(Math.random() * 2);

        this.lives = 5;
        this.score = 15; // score point
        this.type = 'lucky';
    }
}

export default Lucky;