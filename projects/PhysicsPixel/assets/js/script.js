// 3 - Sep - 2023
// img to digital art work...

import Effect from "./ParticleEffect/Effect.js";

window.addEventListener('load', () => {

    const button = document.getElementById('btn');
    const canvas = document.getElementById('htmlCanvas');
    const ctx = canvas.getContext('2d');

    const cWidth = canvas.width = window.innerWidth;
    const cHeight = canvas.height = window.innerHeight;

    const effect = new Effect(cWidth, cHeight);
    effect.init(ctx);

    const animation = () => {
        ctx.clearRect(0, 0, cWidth, cHeight); // clear previous all frames from canvas

        effect.pixelDraw(ctx)
        effect.update()

        requestAnimationFrame(animation); // 60 frames per second...
    };

    animation();

    button.addEventListener('click', () => effect.buttonClickPixelEffect());

    window.addEventListener('resize', e => {
        const cWidth = canvas.width = window.innerWidth;
        const cHeight = canvas.height = window.innerHeight;
        effect.responsiveCanvas(cWidth, cHeight);
        location.reload(); // every time reload window, when window resize perform...
    });

});