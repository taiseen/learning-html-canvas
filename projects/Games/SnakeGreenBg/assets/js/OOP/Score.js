class Score {
    constructor(pen, pixelSize) {
        this.pen = pen;
        this.box = pixelSize;
        this.score = 0;
    }

    drawScore() {
        this.pen.fillStyle = 'white';
        this.pen.font = '40px Change one';
        this.pen.fillText(this.score, 2 * this.box, 1.55 * this.box);
    }

    updateScore() {
        this.score += 1;
    }
}

export default Score;
