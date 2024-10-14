class Explosion {
    constructor(game, x, y) {
        this.game = game;

        this.imgWidth = 200;
        this.imgHight = 200;

        this.width = this.imgWidth;
        this.height = this.imgHight;

        this.x = x - this.width * .5;
        this.y = y - this.height * .5;

        this.frameX = 0;
        this.maxFrame = 8;

        this.timer = 0;
        this.fps = 20;
        this.interval = 1000 / this.fps;

        this.markedForDeletion = false;
    }

    draw(context) {
        context.drawImage(
            this.img,
            this.frameX * this.imgWidth,
            0,
            this.imgWidth,
            this.imgHight,
            this.x,
            this.y,
            this.width,
            this.height,
        );
    }

    update(deltaTime) {
        this.x -= this.game.speed;

        if (this.timer > this.interval) {
            this.frameX++;
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }

        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
}

export default Explosion;