import Enemy from "./Enemy.js";

class Angler1 extends Enemy {
    constructor(game) {
        super(game); // at 1st, merge parent properties also...
        this.width = 228 * .2; // img single unit 
        this.height = 169 * .2; // img single unit 
        this.y = Math.random() * (this.game.height * .9 - this.height); // 90% game height
    }


}

export default Angler1;