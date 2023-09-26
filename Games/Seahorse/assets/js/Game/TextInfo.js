// draw score, timer & other visual representation information...
class TextInfo {
    constructor(game) {
        this.game = game;
        this.fontSize = 20;
        this.color = 'orange';
        this.fontFamily = 'Helvetica';
        this.leftMargin = 20;
    }

    draw(context) {
        context.save();

        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';

        // for score...
        context.fillStyle = this.color;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillText('Score: ' + this.game.score, 20, 40);

        // for timer
        const formatTime = (this.game.gameTime * 0.001).toFixed(0)
        context.fillText('Timer: ' + formatTime, this.leftMargin, 100);

        //===============================================================

        this.gameOverInfo(context);

        //===============================================================

        this.bulletInfo(context);

        //===============================================================

        context.restore();
    }


    gameOverInfo(context) {
        // game over message
        if (this.game.gameOver) {
            context.textAlign = 'center';
            let message1;
            let message2;

            if (this.game.score > this.game.winningScore) {
                message1 = 'You win 🥳';
                message2 = 'Well done!';
            } else {
                message1 = 'You lose 😒';
                message2 = 'Try again next time...';
            }

            context.font = '50px arial';
            context.fillText(message1, this.game.width * .5, this.game.height * .5 - 50);
            context.font = '25px arial';
            context.fillText(message2, this.game.width * .5, this.game.height * .5 + 50);
        }
    }

    bulletInfo(context) {
        // for ammo / lesser bullet...
        context.font = this.fontSize + 'px ' + this.fontFamily; // number of bullets...
        context.textBaseline = 'middle';

        if (this.game.player.powerUp) context.fillStyle = 'tomato';

        let numberLastPosition = 0;
        for (let i = 0; i < this.game.ammo; i++) {
            numberLastPosition = this.leftMargin + 5 * i;
            context.fillRect(numberLastPosition, 50, 3, 20);
        }

        this.game.ammo > 0
            ? context.fillText(this.game.ammo.toFixed(0), numberLastPosition + 15, 61)
            : context.fillText(0, this.leftMargin + 1, 61); 
    }
}

export default TextInfo;