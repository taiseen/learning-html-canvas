class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 608;
        this.canvas.height = 608;
        this.cellSize = 20;
        this.snake = new Snake(this.cellSize);
        this.food = this.createFood();
        this.score = 0;
        this.direction = 'right';

        document.addEventListener('keydown', this.changeDirection.bind(this));

        // Game loop
        this.interval = setInterval(this.update.bind(this), 100);
    }

    createFood() {
        const x = Math.floor(Math.random() * (this.canvas.width / this.cellSize)) * this.cellSize;
        const y = Math.floor(Math.random() * (this.canvas.height / this.cellSize)) * this.cellSize;
        return { x, y };
    }

    changeDirection(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (this.direction !== 'down') this.direction = 'up';
                break;
            case 'ArrowDown':
                if (this.direction !== 'up') this.direction = 'down';
                break;
            case 'ArrowLeft':
                if (this.direction !== 'right') this.direction = 'left';
                break;
            case 'ArrowRight':
                if (this.direction !== 'left') this.direction = 'right';
                break;
        }
    }

    update() {
        this.snake.move(this.direction);
        if (this.snake.collidedWithWall(this.canvas) || this.snake.collidedWithItself()) {
            clearInterval(this.interval);
            alert('Game Over! Your score: ' + this.score);
            location.reload();
        }
        if (this.snake.eat(this.food)) {
            this.score++;
            this.food = this.createFood();
        }
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.draw(this.ctx);
        this.drawFood();
        this.drawScore();
    }

    drawFood() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.food.x, this.food.y, this.cellSize, this.cellSize);
    }

    drawScore() {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '30px Arial';
        this.ctx.fillText('Score: ' + this.score, 10, 30);
    }
}

class Snake {
    constructor(cellSize) {
        this.cellSize = cellSize;
        this.body = [{ x: 3 * cellSize, y: 0 }, { x: 2 * cellSize, y: 0 }, { x: cellSize, y: 0 }];
    }

    move(direction) {
        const head = Object.assign({}, this.body[0]);
        switch (direction) {
            case 'up':
                head.y -= this.cellSize;
                break;
            case 'down':
                head.y += this.cellSize;
                break;
            case 'left':
                head.x -= this.cellSize;
                break;
            case 'right':
                head.x += this.cellSize;
                break;
        }
        this.body.unshift(head);
        this.body.pop();
    }

    collidedWithWall(canvas) {
        const head = this.body[0];
        return (
            head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height
        );
    }

    collidedWithItself() {
        const head = this.body[0];
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }

    eat(food) {
        const head = this.body[0];
        return head.x === food.x && head.y === food.y;
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        this.body.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, this.cellSize, this.cellSize);
        });
    }
}

const game = new SnakeGame();