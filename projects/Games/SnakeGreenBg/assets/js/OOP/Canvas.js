import Score from "./Score.js";
import Snake from "./Snake.js";
import Food from "./Food.js";

class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.pen = this.canvas.getContext("2d"); // other way you’ll tell your pen to draw something on a blank sheet of paper...

        this.canvas.width = 608;
        this.canvas.height = 608;
        this.cWidth = this.canvas.width;
        this.cHeight = this.canvas.height;

        this.box = 32; // create a pixel unit...

        // Set up game loop
        this.framePerSecond = 150;
        this.interval = setInterval(this.gameAnimation.bind(this), this.framePerSecond);

        // get all game related objects...
        this.food = new Food(this.pen, this.box);
        this.score = new Score(this.pen, this.box);
        this.snake = new Snake(this.pen, this.box, this.food, this.score, this.interval);
    }

    drawCanvasBackground() {
        const imgBg = new Image();
        imgBg.src = "./assets/img/bg.png"; // for background image...
        this.pen.drawImage(imgBg, 0, 0); // draw the background from image file inside canvas
    }

    getBoundaryPosition() {
        // get all side of boundary area value from bg image...
        const bTop = this.box * 3;
        const bLeft = this.box;
        const bRight = this.box * 17;
        const bBottom = this.box * 17;

        return { bTop, bLeft, bRight, bBottom };
    }

    gameAnimation() {
        this.drawCanvasBackground();

        this.food.drawFoodImg();

        this.snake.drawShake();

        this.score.drawScore();

        this.snake.snakeMove();
    }
}

new Canvas();