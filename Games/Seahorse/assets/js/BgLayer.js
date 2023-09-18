// Handle individual background layer - parallax effect 
class BgLayer {
    constructor(game, image, speedModifier) {
        this.game = game;
        this.image = image;
        this.speedModifier = speedModifier;
        this.width = 1768;
        this.height = 500;
        this.x = 0;
        this.y = 0;
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y);
        context.drawImage(this.image, this.x + this.width, this.y);
    }

    update() {
        if (this.x <= -this.width) this.x = 0;
        this.x -= this.game.speed * this.speedModifier;
    }
}

export default BgLayer;