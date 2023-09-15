// 7 - Sep - 2023

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cWidth = canvas.width = 800;
const cHeight = canvas.height = 600;


const box = 60;
const gridRow = 10;
const gridCol = 10;

const canvasMap = [
    0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
    0, 1, 1, 1, 1, 1, 0, 1, 0, 0,
    0, 1, 0, 0, 1, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 1, 0, 1, 1, 1, 0,
    0, 1, 1, 0, 1, 1, 1, 0, 1, 0,
    0, 0, 1, 0, 0, 0, 0, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
]

const drawMap = () => {

    for (let row = 0; row < gridRow; row++) {

        for (let col = 0; col < gridCol; col++) {

            const arrayIdx = row * gridRow + col;

            if (canvasMap[arrayIdx] == 1) {
                ctx.fillStyle = '#aaa';
                ctx.fillRect(box * col, box * row, box, box);
            } else {
                ctx.fillStyle = '#333';
                ctx.fillRect(box * col, box * row, box, box);
            }
        }
    }
}


drawMap();