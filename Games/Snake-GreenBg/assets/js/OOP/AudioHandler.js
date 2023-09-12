class AudioHandler {

    constructor() {
        this.up = new Audio();
        this.down = new Audio();
        this.left = new Audio();
        this.right = new Audio();
        this.dead = new Audio();
        this.eat = new Audio();

        this.up.src = "./assets/audio/up.mp3";
        this.down.src = "./assets/audio/down.mp3";
        this.left.src = "./assets/audio/left.mp3";
        this.right.src = "./assets/audio/right.mp3";
        this.dead.src = "./assets/audio/dead.mp3";
        this.eat.src = "./assets/audio/eat.mp3";
    }

    // Singleton Pattern for Audio Handling:
    // Singleton pattern to ensure that...
    // there is only one instance of the AudioHandler class throughout your application. 
    // This can help manage audio resources effectively.
    static getInstance() {
        if (!this.object) {
            this.object = new AudioHandler();
        }
        return this.object;
    }

    playUp() {
        this.up.play();
    }

    playDown() {
        this.down.play();
    }

    playLeft() {
        this.left.play();
    }

    playRight() {
        this.right.play();
    }

    playDead() {
        this.dead.play();
    }

    playEat() {
        this.eat.play();
    }
}

export default AudioHandler;