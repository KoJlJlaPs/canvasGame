import { map } from './data/map';
import { MapOptions } from './mapOptions';

// Опции по рисованию на холсте
export class DrawOptions {
    constructor(width, idName, images) {
        // Размер блока
        this._w = width;
        // Холст
        const canvas = document.getElementById(idName);
        this._context = canvas.getContext('2d');
        // Количество блоков по горизонтале и по вертикале
        this._xCount = canvas.clientWidth / width;
        this._yCount = canvas.clientHeight / width;
        // Изменения окна
        this._diff = {
            x: 0,
            y: 0,
        };
        // Все картинки используемые в игре
        this._images = images;
        this._drawMap();
        // Прорисовка для начального изображения
    }

    get w() {
        return this._w;
    }

    // Заполнение цветом по координатам
    draw(x, y, color = null) {
        if (!color) color = MapOptions.color(Math.floor(x / this._w), Math.floor(y / this._w));
        this._context.fillStyle = color;
        this._context.fillRect(
            x + this._diff.x * this._w,
            y + this._diff.y * this._w,
            this._w,
            this._w,
        );
    }

    // Рисование картины по координатам
    drawImage(x, y, name) {
        if (y + this._diff.y * this._w == this._w * this._yCount) this._moveGameWindow('bottom');
        else if (y + this._diff.y * this._w < 0) this._moveGameWindow('top');
        else if (x + this._diff.x * this._w == this._w * this._xCount)
            this._moveGameWindow('right');
        else if (x + this._diff.x * this._w < 0) this._moveGameWindow('left');

        this._context.drawImage(
            this._images[name],
            x + this._diff.x * this._w,
            y + this._diff.y * this._w,
            this._w,
            this._w,
        );
    }

    // Изменение положение игрового окна
    _moveGameWindow(action) {
        switch (action) {
            case 'left':
                this._diff.x += this._xCount;
                break;
            case 'right':
                this._diff.x -= this._xCount;
                break;
            case 'top':
                this._diff.y += this._yCount;
                break;
            case 'bottom':
                this._diff.y -= this._yCount;
                break;
            default:
                break;
        }
        this._drawMap();
    }

    // Рисование карты
    _drawMap() {
        map.forEach((value, y) => {
            value.forEach((val, x) => {
                if (
                    Math.abs(this._diff.x) <= x &&
                    x < this._xCount - this._diff.x &&
                    Math.abs(this._diff.y) <= y &&
                    y < this._yCount - this._diff.y
                ) {
                    this.draw(x * this._w, y * this._w);
                }
            });
        });
    }
}
