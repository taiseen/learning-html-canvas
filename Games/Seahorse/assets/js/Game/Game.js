import Background from "../Background/Background.js";
import InputHandler from "../Input/InputHandler.js";
import Angler1 from "../Enemy/Angler1.js";
import Angler2 from "../Enemy/Angler2.js";
import Player from "../Player/Player.js";
import TextInfo from "./TextInfo.js";
import Lucky from "../Enemy/Lucky.js";

// All logic come together... || Brain of this project...
class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        // object's creation...
        this.keyBoardInput = new InputHandler(this);
        this.background = new Background(this);
        this.textInfo = new TextInfo(this);
        this.player = new Player(this);

        this.audio = document.getElementById('audio1');
        // this.audio.src = '../audio/shoot.wav';

        // tracking key press...
        this.keyPress = []; // always track user key press... & its available in all our code base...
        this.key = {
            up: 'ArrowUp',
            down: 'ArrowDown',
            enter: 'Enter',
            space: ' ',
            debug: 'd',
        }
        this.debugMode = false;

        // for lesser bullet...
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 500; // .5 second...

        // for enemy
        this.enemies = []; // create a holder to hold all enemies {objects}...
        this.enemyTimer = 0;
        this.enemyInterval = 1000; // 1s second...

        // for score
        this.score = 0;
        this.winningScore = 10;

        // for game time and speed
        this.speed = 1;
        this.gameTime = 0;
        this.timeLimit = 150000; // 5s
        this.gameOver = false;
    }

    // focus on ==> static...
    draw(context) {
        this.background.draw(context);
        this.player.draw(context);
        this.textInfo.draw(context);
        this.enemies.forEach(enemy => enemy.draw(context));
    }

    // focus on ==> dynamic... 
    update(deltaTime) {
        this.background.update();
        this.player.update(deltaTime);

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
            this.enemyTimer = 0;

            // call enemy to canvas...
            this.addEnemy(); // when game over, then this call stop...
        } else {
            this.enemyTimer += deltaTime;
        }

        this.enemies.forEach(enemy => {
            enemy.update(); // position update for enemies...

            if (this.isCollision(enemy, this.player)) {
                enemy.markedForDeletion = true;
                if (enemy.type === 'lucky') {
                    this.player.enterPowerUp();
                }
                else {
                    this.score--;
                }
            }


            // traverse inside bullet holder for collision checking...
            this.player.bullets.forEach(bullet => {

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

        // remove enemy from [enemies array]
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion); // remove old enemies...

        //===============================================================
    }

    addEnemy() {
        // store enemy {object's} into enemies [holder]
        const random = Math.random();

        if (random < .3) this.enemies.push(new Angler1(this));
        else if (random < .6) this.enemies.push(new Angler2(this));
        else this.enemies.push(new Lucky(this));
    }

    isCollision(obj1, obj2) {
        return (
            obj1.x + obj1.width > obj2.x &&
            obj1.x < obj2.width + obj2.x &&
            obj1.y + obj1.height > obj2.y &&
            obj1.y < obj2.height + obj2.y
        )
    }
}

export default Game;
