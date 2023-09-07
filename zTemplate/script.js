// 7 - Sep - 2023

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cWidth = canvas.width = window.innerWidth;
const cHeight = canvas.height = window.innerHeight;


const rectangleSize = 100;

ctx.fillStyle = 'tomato'
ctx.fillRect(100, 100, rectangleSize, rectangleSize);
ctx.fillRect(200, 200, rectangleSize, rectangleSize);


const startAnimation = () => {
    ctx.clearRect(0, 0, cWidth, cHeight); // clear all previous frames...

    ctx.fillStyle = 'tomato'
    ctx.fillRect(500, 500, rectangleSize, rectangleSize);

    requestAnimationFrame(startAnimation);
}
// startAnimation();