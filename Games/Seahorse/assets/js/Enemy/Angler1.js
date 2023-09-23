import Enemy from "./Enemy.js";

class Angler1 extends Enemy {
    constructor(game) {
        super(game); // at 1st, merge parent properties also...
        this.width = 228; // img single unit 
        this.height = 169; // img single unit 
        this.y = Math.random() * (this.game.height * .9 - this.height); // random height with 90% game height
        
        this.img = document.getElementById('angler1');
        this.frameY = Math.floor(Math.random() * 3);
    }
}

export default Angler1;