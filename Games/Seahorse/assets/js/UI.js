// draw score, timer & other visual representation information...
class UI {
    constructor(game) {
        this.game = game;
        this.color = 'orange';
        this.fontSize = '20px';
        this.fontFamily = 'Helvetica';
    }

    draw(context) {

        const leftMargin = 20;
        let numberLastPosition = 0;
        
        // for ammo / lesser bullet
        context.font = this.fontSize + ' ' + this.fontFamily;
        context.fillStyle = this.color;
        context.textBaseline = 'middle';

        for (let i = 0; i < this.game.ammo; i++) {
            numberLastPosition = leftMargin + 5 * i;
            context.fillRect(numberLastPosition, 50, 3, 20);
        }
        context.fillText(this.game.ammo, leftMargin + numberLastPosition - 10, 61);

    }
}

export default UI;