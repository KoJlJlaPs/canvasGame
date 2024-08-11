/*
    Начало программы
*/

import { Game } from './game';

// Константы для игры
const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_WIDTH = window.innerWidth;
const CANVAS_ID_NAME = 'game-field';
const BLOCK_SIZE = 80;
const CANVAS_ELEMENT = document.getElementById(CANVAS_ID_NAME);

//  Проверка на устройство
//  Если мобильное то использовать малый масштаб карты и картинок
if (/Android|iPhone/i.test(navigator.userAgent)) {
    if (WINDOW_WIDTH > WINDOW_HEIGHT) {
        CANVAS_ELEMENT.width = 8 * BLOCK_SIZE;
        CANVAS_ELEMENT.height = 4 * BLOCK_SIZE;
    } else {
        CANVAS_ELEMENT.width = 4 * BLOCK_SIZE;
        CANVAS_ELEMENT.height = 8 * BLOCK_SIZE;
    }
} else {
    CANVAS_ELEMENT.width = 8 * BLOCK_SIZE;
    CANVAS_ELEMENT.height = 8 * BLOCK_SIZE;
}

//  Проверка на ориентацию мобильного устройства
window.onorientationchange = () => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    if (width > height) {
        CANVAS_ELEMENT.width = 8 * BLOCK_SIZE;
        CANVAS_ELEMENT.height = 4 * BLOCK_SIZE;
    } else {
        CANVAS_ELEMENT.width = 4 * BLOCK_SIZE;
        CANVAS_ELEMENT.height = 8 * BLOCK_SIZE;
    }
};

//  Загрузка игры
window.onload = () => {
    const images = {};
    document.querySelectorAll('img').forEach((image) => {
        images[image.id] = image;
    });
    const game = new Game(BLOCK_SIZE, CANVAS_ELEMENT, images);
    game.setMainHero(4, 5);
};
