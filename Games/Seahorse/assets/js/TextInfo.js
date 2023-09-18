// draw score, timer & other visual representation information...
class TextInfo {
    constructor(game) {
        this.game = game;
        this.color = 'orange';
        this.fontSize = 20;
        this.fontFamily = 'Helvetica';
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

        //===============================================================

        // for ammo / lesser bullet...
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textBaseline = 'middle';

        const leftMargin = 20;
        let numberLastPosition = 0;
        for (let i = 0; i < this.game.ammo; i++) {
            numberLastPosition = leftMargin + 5 * i;
            context.fillRect(numberLastPosition, 50, 3, 20);
        }

        this.game.ammo > 0
            ? context.fillText(this.game.ammo, numberLastPosition + 10, 61)
            : context.fillText(this.game.ammo, leftMargin, 61);

        //===============================================================

        // for timer
        const formatTime = (this.game.gameTime * 0.001).toFixed(0)
        context.fillText('Timer: ' + formatTime, leftMargin, 100);

        //===============================================================

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

        context.restore();
    }
}

export default TextInfo;