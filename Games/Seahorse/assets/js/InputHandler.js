// track key board input by user...
class InputHandler {
    constructor(game) {
        this.game = game;

        // 🔍🔍🔍 track when user ⬇️ [...press...] key from keyboard...
        window.addEventListener('keydown', (e) => {
            if (
                (
                    e.key === this.game.key.up ||
                    e.key === this.game.key.down
                )
                &&
                this.game.keyPress.indexOf(e.key) === -1 // if e.key is not present, then add it..
            ) {
                this.game.keyPress.push(e.key);
            } else if (
                e.key === this.game.key.space ||
                e.key === this.game.key.enter
            ) {
                this.game.player.shootTop();
            } else if (e.key === this.game.key.debug) {
                this.game.debugMode = !this.game.debugMode
            }
        });

        // 🔍🔍🔍 track when user ⬆️ [...release...] key from keyboard...
        window.addEventListener('keyup', (e) => {
            // if e.key is present, then remove it..

            // style :- 1
            // if (this.game.keyPress.indexOf(e.key) > -1) {
            //     this.game.keyPress.splice(this.game.keyPress.indexOf(e.key), 1)
            // }

            // style :- 2
            // const idx = this.game.keyPress.indexOf(e.key);
            // if (idx > -1) this.game.keyPress.splice(idx, 1);

            // style :- 3
            this.game.keyPress = this.game.keyPress.filter(key => key !== e.key);
        });

    }
}

export default InputHandler;