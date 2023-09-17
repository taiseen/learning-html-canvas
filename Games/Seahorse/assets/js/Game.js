import InputHandler from "./InputHandler.js";
import Angler1 from "./Enemy/Angler1.js";
import Player from "./Player.js";
import UI from "./UI.js";

// All logic come together... || Brain of this project...
class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        // objects call...
        this.player = new Player(this);
        this.keyBoardInput = new InputHandler(this);
        this.ui = new UI(this);

        // tracking key press...
        this.keyPress = []; // always track user key press... & its available in all our code base...
        this.key = {
            up: 'ArrowUp',
            down: 'ArrowDown',
            enter: 'Enter',
            space: ' ',
            debugMode: 'd',
        }

        // for lesser bullet...
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 500; // .5 second...

        // for enemy
        this.enemies = []; // hold all enemies {objects}...
        this.enemyTimer = 0;
        this.enemyInterval = 1000; // 1s second...

        this.score = 0;
        this.winningScore = 10;

        this.gameTime = 0;
        this.timeLimit = 5000; // 5s 

        this.gameOver = false;
    }

    // focus on ==> static...
    draw(context) {
        this.player.draw(context);
        this.ui.draw(context);
        this.enemies.forEach(enemy => enemy.draw(context));
    }

    // focus on ==> dynamic... 
    update(deltaTime) {
        this.player.update();

        //===============================================================

        if (!this.gameOver) this.gameTime += deltaTime;
        if (this.gameTime > this.timeLimit) this.gameOver = true;

        //===============================================================

        // for lesser bullet amount control...
        if (this.ammoTimer > this.ammoInterval) {
            if (this.maxAmmo > this.ammo) this.ammo++;
            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime;
        }

        //===============================================================

        // for enemy timing control...
        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.addEnemy(); // call enemy to canvas...
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }

        this.enemies.forEach(enemy => {
            enemy.update(); // position update for enemies...

            if (this.isCollision(enemy, this.player)) enemy.markedForDeletion = true;

            this.player.projectTiles.forEach(bullet => {

                if (this.isCollision(bullet, enemy)) {
                    bullet.markedForDeletion = true;

                    enemy.lives--;
                    if (enemy.lives <= 0) {
                        enemy.markedForDeletion = true;

                        if (!this.gameOver) this.score += enemy.score;
                        if (this.score > this.winningScore) this.gameOver = true;
                    }
                }
            })
        });

        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion); // remove old enemies...

        //===============================================================
    }

    addEnemy() {
        this.enemies.push(new Angler1(this));
    }

    isCollision(obj1, obj2) {
        const o1Left = obj1.x;
        const o1Right = obj1.x + obj1.width;
        const o1Top = obj1.y;
        const o1Bottom = obj1.y + obj1.height;

        const o2Left = obj2.x;
        const o2Right = obj2.x + obj2.width;
        const o2Top = obj2.y;
        const o2Bottom = obj2.y + obj2.height;

        return (
            o1Right > o2Left &&
            o1Left < o2Right &&
            o1Top < o2Bottom &&
            o1Bottom > o2Top
        )
    }
}

export default Game;
