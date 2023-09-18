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

    startAnimation = () => {
        this.context.clearRect(0, 0, this.cWidth, this.cHeight); // clear all previous frames...

        this.drawCenterRect(this.context);

        requestAnimationFrame(this.startAnimation);
    }
}

window.addEventListener('load', () => new Canvas());