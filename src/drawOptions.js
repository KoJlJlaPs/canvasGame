import { map } from './data/map';
import { MapOptions } from './mapOptions';

// Опции по рисованию на холсте
export class DrawOptions {
    constructor(width, idName, images) {
        // Размер блока
        this.w = width;
        // Холст
        const canvas = document.getElementById(idName);
        this._context = canvas.getContext('2d');
        // Все картинки используемые в игре
        this._images = images;
        // Прорисовка для начального изображения
        map.forEach((value, y) => {
            value.forEach((val, x) => {
                this.clear(x, y);
            });
        });
    }

    // Заполнение цветом по координатам
    draw(x, y, color) {
        this._context.fillStyle = color;
        this._context.fillRect(x * this.w, y * this.w, this.w, this.w);
    }

    // Рисование картины по координатам
    drawImage(x, y, name) {
        this._context.drawImage(
            this._images[name],
            x * this.w + 1,
            y * this.w + 1,
            this.w - 1,
            this.w - 1,
        );
    }

    // Очищение по координатам
    clear(x, y) {
        this.draw(x, y, MapOptions.color(x, y));
    }
}
