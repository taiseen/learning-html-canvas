import AudioHandler from "./AudioHandler.js";

class KeyBoardDirection {
    constructor() {
        // this.audio = new AudioHandler();
        this.audio = AudioHandler.getInstance();
        this.direction = undefined;
        this.keyMove = {
            left: 'left',
            right: 'right',
            up: 'up',
            down: 'down',
        };

        document.addEventListener('keydown', this.navigation.bind(this));
    }

    navigation(e) {
        const { keyCode } = e;
        const { left, up, right, down } = this.keyMove;

        switch (keyCode) {
            case 37:
                if (this.direction !== right) {
                    this.direction = left;
                    this.audio.playLeft();
                }
                break;

            case 38:
                if (this.direction !== down) {
                    this.direction = up;
                    this.audio.playUp();
                }
                break;

            case 39:
                if (this.direction !== left) {
                    this.direction = right;
                    this.audio.playRight();
                }
                break;

            case 40:
                if (this.direction !== up) {
                    this.direction = down;
                    this.audio.playDown();
                }
                break;

            default:
                break;
        }
    }
}

export default KeyBoardDirection;