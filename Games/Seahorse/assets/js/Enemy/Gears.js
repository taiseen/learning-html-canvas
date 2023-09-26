// falling balls, etc...
class Gears {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;

        this.img = document.getElementById('gears');
        this.gearFrameX = Math.floor(Math.random() * 3);
        this.gearFrameY = Math.floor(Math.random() * 3);
        this.speedModifier = (Math.random() * .5 + .5).toFixed(1);
        this.spriteSize = 50;
        this.size = this.speedModifier * this.spriteSize; // every gear is different size

        this.speedX = Math.random() * 6 - 3;// gear fallen from x both left/right direction
        this.speedY = Math.random() * -15; // gear moving upward negative y direction for top
        this.gravity = .5;
        this.angle = 0;
        this.va = Math.random() * .2 - .1; // velocity of angle 

        this.markedForDeletion = false;

        this.bounced = 0;
        this.bottomBoundaryBounce = Math.random() * 100 + 60;
    }

    draw(context) {
        context.drawImage(
            this.img,
            this.gearFrameX * this.spriteSize,
            this.gearFrameY * this.spriteSize,
            this.spriteSize,
            this.spriteSize,
            this.x,
            this.y,
            this.size,
            this.size
        );

    }

    update() {
        this.angle += this.va;
        this.speedY += this.gravity;
        this.x -= this.speedX;
        this.y += this.speedY;

        if (
            this.x < 0 - this.size ||
            this.y > this.game.height + this.size
        ) {
            this.markedForDeletion = true; // removing flag...
        }

        if (
            this.y > this.game.height - this.bottomBoundaryBounce &
            this.bounced < 2
        ) {
            this.bounced++;
            this.speedY *= -.5;
        }
    }
}

export default Gears;