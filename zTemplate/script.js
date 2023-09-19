// 07 - Sep - 2023 - setup normal template...
// 18 - Sep - 2023 - class base refactor...

class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.cWidth = this.canvas.width = 900;
        this.cHeight = this.canvas.height = 600;

        this.startAnimation();
    }

    drawCenterRect(context) {
        const rS = 100;
        const cW = this.cWidth;
        const cH = this.cHeight;

        // =======================================================================

        // center...
        context.fillStyle = 'pink';
        context.fillRect((cW - rS) / 2, (cH - rS) / 2, rS, rS);

        context.fillStyle = 'orange';
        context.fillRect((cW - rS) / 2 - 100, (cH - rS) / 2, rS, rS);
        context.fillStyle = 'orange';
        context.fillRect((cW - rS) / 2 + 100, (cH - rS) / 2, rS, rS);

        context.fillStyle = 'tomato';
        context.fillRect((cW - rS) / 2, (cH - rS) / 2 - 100, rS, rS);
        context.fillStyle = 'tomato';
        context.fillRect((cW - rS) / 2, (cH - rS) / 2 + 100, rS, rS);

        // =======================================================================

        // corner area...
        context.fillStyle = 'lightgreen';
        context.fillRect(0, 0, rS, rS);

        context.fillStyle = 'lightgreen';
        context.fillRect(cW - rS, 0, rS, rS);

        context.fillStyle = 'lightgreen';
        context.fillRect(0, cH - rS, rS, rS);

        context.fillStyle = 'lightgreen';
        context.fillRect(cW - rS, cH - rS, rS, rS);

        // =======================================================================

        // middle area...
        context.fillStyle = 'pink';
        context.fillRect((cW - rS) / 2, 0, rS, rS);

        context.fillStyle = 'pink';
        context.fillRect((cW - rS) / 2, cH - rS, rS, rS);

        context.fillStyle = 'pink';
        context.fillRect(0, (cH - rS) / 2, rS, rS);

        context.fillStyle = 'pink';
        context.fillRect(cW - rS, (cH - rS) / 2, rS, rS);
    }

    drawLine(context) {
        const cW = this.cWidth;
        const cH = this.cHeight;

        // diagonal line...
        context.strokeStyle = 'red'
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(cW, cH);
        context.stroke();

        // opposite diagonal line...
        context.strokeStyle = 'orange'
        context.beginPath();
        context.moveTo(cW, 0);
        context.lineTo(0, cH);
        context.stroke();

        // center vertical line...
        context.strokeStyle = 'green'
        context.beginPath();
        context.moveTo(cW / 2 + 60, 0);
        context.lineTo(cW / 2 + 60, cH);
        context.stroke();

        // center horizontal line...
        context.strokeStyle = 'green'
        context.beginPath();
        context.moveTo(0, cH / 2 + 60);
        context.lineTo(cW, cH / 2 + 60);
        context.stroke();

        // half left ==> horizontal line...
        context.strokeStyle = 'black'
        context.beginPath();
        context.moveTo(0, cH / 2);
        context.lineTo(cW / 2, cH / 2);
        context.stroke();

        // half right ==> horizontal line...
        context.strokeStyle = 'gray'
        context.beginPath();
        context.moveTo(cW / 2, cH / 2);
        context.lineTo(cW, cH / 2);
        context.stroke();

        // half bottom ==> vertical line...
        context.strokeStyle = 'blue'
        context.beginPath();
        context.moveTo(cW / 2, 0);
        context.lineTo(cW / 2, cH / 2);
        context.stroke();

        // half top ==> vertical line...
        context.strokeStyle = 'brown'
        context.beginPath();
        context.moveTo(cW / 2, cH / 2);
        context.lineTo(cW / 2, cH);
        context.stroke();
    }

    startAnimation = () => {
        this.context.clearRect(0, 0, this.cWidth, this.cHeight); // clear all previous frames...

        this.drawCenterRect(this.context);
        this.drawLine(this.context);

        requestAnimationFrame(this.startAnimation);
    }
}

window.addEventListener('load', () => new Canvas());