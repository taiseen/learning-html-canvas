// 7 - Sep - 2023

import Shape from './Shape.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cHeight = canvas.height = window.innerHeight;
const cWidth = canvas.width = window.innerWidth;

const shape = new Shape(cWidth, cHeight, ctx);


// keyboard navigation control
window.addEventListener('keydown', (e) => shape.shapeMoveByKey(e.code));


const startAnimation = () => {
    ctx.clearRect(0, 0, cWidth, cHeight); // clear all previous frames...

    
    // shape.drawHorizontalLine();
    // shape.drawVerticalLine();
    shape.drawRectangle();
    // shape.drawCircle();
    // shape.drawText();

    
    // fixed shape...
    const rSize = 100;
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(cWidth * .5 - rSize / 2, cHeight * .5 - rSize / 2, rSize, rSize);


    requestAnimationFrame(startAnimation);
}
startAnimation();
