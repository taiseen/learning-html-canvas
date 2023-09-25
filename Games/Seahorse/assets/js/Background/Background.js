import Layer from "./Layer.js";

// Put all Layer Objects together to animate all game world
class Background {
    constructor(game) {
        this.game = game;

        this.img1 = document.getElementById('layer1');
        this.img2 = document.getElementById('layer2');
        this.img3 = document.getElementById('layer3');
        this.img4 = document.getElementById('layer4');

        this.layer1 = new Layer(this.game, this.img1, .3);    // bg layer speed ==> .3
        this.layer2 = new Layer(this.game, this.img2, .6);    // bg layer speed ==> .6
        this.layer3 = new Layer(this.game, this.img3, .8);    // bg layer speed ==> .8
        this.layer4 = new Layer(this.game, this.img4, 1);     // bg layer speed ==> 1

        this.layers = [this.layer1, this.layer2, this.layer3, this.layer4]; // layer's [holder]...
    }

    draw(context) {
        this.layers.forEach(layer => layer.draw(context)); // by this loop calling layer's draw method...
    }

    update() {
        this.layers.forEach(layer => layer.update()); // by this loop calling layer's update method...
    }
}

export default Background;
