import KeyBoardDirection from "./KeyBoardDirection.js";
import AudioHandler from "./AudioHandler.js";

class Snake {
    constructor(pen, pixel, food, score, interval) {
        this.pen = pen;
        this.box = pixel;
        this.food = food;
        this.score = score;
        this.interval = interval;

        console.log(this.interval);

        // initialized snake x & y position {object}... [center of the canvas]
        this.snake = [{ xAxis: this.box * 9, yAxis: this.box * 10 }];

        // this.audio = new AudioHandler();
        this.audio = AudioHandler.getInstance();
        this.keyboard = new KeyBoardDirection();

        this.headX = this.snake[0].xAxis;
        this.headY = this.snake[0].yAxis;
    }

    drawShake() {
        // draw the shake...
        for (let i = 0; i < this.snake.length; i++) {
            this.pen.fillStyle = i === 0 ? "green" : "white";
            this.pen.fillRect(this.snake[i].xAxis, this.snake[i].yAxis, this.box, this.box);

            this.pen.strokeStyle = "tomato";
            this.pen.strokeRect(this.snake[i].xAxis, this.snake[i].yAxis, this.box, this.box);
        }
    }

    removeSnakeTail() {
        this.snake.pop();
    }

    addNewHeadForSnake(newHead) {
        this.snake.unshift(newHead);
    }

    snakeMove() {
        const { keyMove, direction } = this.keyboard;
        const { left, up, right, down } = keyMove;

        if (direction === right) this.headX = this.headX + this.box;
        if (direction === left) this.headX = this.headX - this.box;
        if (direction === down) this.headY = this.headY + this.box;
        if (direction === up) this.headY = this.headY - this.box;

        // create snake ==> new head...
        const newHead = { xAxis: this.headX, yAxis: this.headY };

        this.addNewHeadForSnake(newHead);

        // by moving snake ready to start eat food...
        this.eatFood();
    }

    eatFood() {
        // snake eat food...
        if (this.headX === this.food.xAxis && this.headY === this.food.yAxis) {
            // do 2 things...
            this.score.updateScore();       //  1. increment score
            this.food.updateFoodPosition(); //  2. generate new food...

            this.audio.playEat();
            // wont remove tail...
        } else {
            // remove snake tail form [array] of {object's}...
            this.removeSnakeTail();
        }
    }


    // clearInterval(this.interval);
    // alert('Game Over! Your score: ' + this.score);
    // location.reload();
}

export default Snake;