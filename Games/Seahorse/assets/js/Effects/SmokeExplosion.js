import Explosion from "./Explosion.js";

class SmokeExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);

        this.img = document.getElementById('smokeExplosion');
        this.imgWidth = 200;

        this.width = this.imgWidth;
        this.height = this.imgHight;

        this.x = x - this.width * .5;
        this.y = y - this.height * .5;
    }
}

export default SmokeExplosion;