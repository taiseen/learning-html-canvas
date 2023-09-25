import Enemy from "./Enemy.js";

class Angler2 extends Enemy {
    constructor(game) {
        super(game); // at 1st, merge parent properties also...
        this.width = 213; // img single unit 
        this.height = 165; // img single unit 
        this.y = Math.random() * (this.game.height * .9 - this.height); // random height with 90% game height
        
        this.lives = 3;
        this.score = this.lives;

        this.img = document.getElementById('angler2');
        this.enemyFrameY = Math.floor(Math.random() * 2);
    }
}

export default Angler2;