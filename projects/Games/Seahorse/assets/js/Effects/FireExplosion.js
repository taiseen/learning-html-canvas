import Explosion from "./Explosion.js";

class FireExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.img = document.getElementById('fireExplosion');
    }
}

export default FireExplosion;