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
                this.draw(x * width, y * width);
            });
        });
    }

    // Заполнение цветом по координатам
    draw(x, y, color = MapOptions.color(Math.floor(x / this.w), Math.floor(y / this.w))) {
        this._context.fillStyle = color;
        console.log(x, y);
        this._context.fillRect(x, y, this.w, this.w);
    }

    // Рисование картины по координатам
    drawImage(x, y, name) {
        this._context.drawImage(this._images[name], x + 1, y + 1, this.w - 1, this.w - 1);
    }
}
