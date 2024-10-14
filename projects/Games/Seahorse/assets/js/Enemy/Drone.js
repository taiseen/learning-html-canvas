import Enemy from "./Enemy.js";

class Drone extends Enemy {
    constructor(game, x, y) {
        super(game); // at 1st, merge parent properties also...
        this.width = 115; // img single unit 
        this.height = 95; // img single unit 
        this.x = x;
        this.y = y;
        this.img = document.getElementById('drone');
        this.enemyFrameY = Math.floor(Math.random() * 2);

        this.lives = 3;
        this.score = this.lives; // score point
        this.type = 'drone';

        this.speedX = Math.random() * -4.2 - .5;
    }
}

export default Drone;