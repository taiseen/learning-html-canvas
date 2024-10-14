import Explosion from "./Explosion.js";

class SmokeExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.img = document.getElementById('smokeExplosion');
    }
}

export default SmokeExplosion;