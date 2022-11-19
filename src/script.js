import { Game } from './game';

const height = window.innerHeight;
const width = window.innerWidth;
let blockSize = 100;
console.log(height, width);
const canvas = document.getElementById('game-field');
if (/Android|iPhone/i.test(navigator.userAgent)) {
    blockSize = 80;
    if (width > height) {
        canvas.width = 640;
        canvas.height = 320;
    } else {
        canvas.width = 320;
        canvas.height = 640;
    }
}
else{
    canvas.width = 800;
    canvas.height = 800;
}

window.onorientationchange = () => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    if (width > height) {
        canvas.width = 640;
        canvas.height = 320;
    } else {
        canvas.width = 320;
        canvas.height = 640;
    }
}

window.onload = () => {
    const images = {};
    document.querySelectorAll('img').forEach((image) => {
        images[image.id] = image;
    });
    const game = new Game(blockSize, 'game-field', images);
    game.setMainHero(4, 5);
};
