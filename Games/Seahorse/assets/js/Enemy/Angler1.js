import Enemy from "./Enemy.js";

class Angler1 extends Enemy {
    constructor(game) {
        super(game); // at 1st, merge parent properties also...
        this.width = 228; // img single unit 
        this.height = 169; // img single unit 
        
        this.y = Math.random() * (this.game.height * .95 - this.height); // random height with 95% game height
        
        this.lives = 2;
        this.score = this.lives;

        this.img = document.getElementById('angler1');
        this.enemyFrameY = Math.floor(Math.random() * 3);
    }
}

export default Angler1;