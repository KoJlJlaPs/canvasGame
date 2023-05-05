/*
    Начало программы
*/

import { Game } from './game';

const height = window.innerHeight;
const width = window.innerWidth;
let blockSize;
console.log(height, width);
const canvas = document.getElementById('game-field');

//  Проверка на устройство
//  Если мобильное то использовать малый масштаб карты и картинок
if (/Android|iPhone/i.test(navigator.userAgent)) {
    blockSize = 80;
    if (width > height) {
        canvas.width = 8 * blockSize;
        canvas.height = 4 * blockSize;
    } else {
        canvas.width = 4 * blockSize;
        canvas.height = 8 * blockSize;
    }
} else {
    blockSize = 80;
    canvas.width = 8 * blockSize;
    canvas.height = 8 * blockSize;
}

//  Проверка на ориентацию устройства
window.onorientationchange = () => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    if (width > height) {
        canvas.width = 8 * blockSize;
        canvas.height = 4 * blockSize;
    } else {
        canvas.width = 4 * blockSize;
        canvas.height = 8 * blockSize;
    }
};

//  Загрузка игры
window.onload = () => {
    const images = {};
    document.querySelectorAll('img').forEach((image) => {
        images[image.id] = image;
    });
    const game = new Game(blockSize, 'game-field', images);
    game.setMainHero(4, 5);
};
