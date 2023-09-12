class Food {
    constructor(pen, pixelSize) {
        this.pen = pen;
        this.box = pixelSize;

        // generate randomly food at x & y position {object} inside bg...
        this.xAxis = Math.floor(Math.random() * 17 + 1) * this.box;
        this.yAxis = Math.floor(Math.random() * 15 + 3) * this.box;

        this.imgFood = new Image();
        this.imgFood.src = "./assets/img/food.png"; // for food image...
    }

    drawFoodImg() {
        this.pen.drawImage(this.imgFood, this.xAxis, this.yAxis); // draw the food from image file inside canvas
    }

    // after eating the food, again call this, for generating food...
    updateFoodPosition() {
        this.xAxis = Math.floor(Math.random() * 17 + 1) * this.box;
        this.yAxis = Math.floor(Math.random() * 15 + 3) * this.box;
    }
}

export default Food;
