import { map } from './map/mapConfig';
import MapOptions from './map/mapOptions';
import config from './config';
const { CONVERT_HEX_TO_DEC, CONVERT_DEC_TO_HEX } = config;
// Опции по рисованию на холсте
export class DrawOptions {
    constructor(blockLength, canvasElement, images) {
        // Размер блока
        this._width = blockLength;
        // Холст
        const canvas = canvasElement;
        this._context = canvas.getContext('2d');
        // Количество блоков по горизонтале и по вертикале
        this._xCount = canvas.clientWidth / blockLength;
        this._yCount = canvas.clientHeight / blockLength;
        // Изменения окна
        this._diff = {
            x: 0,
            y: 0,
        };
        // Все картинки используемые в игре
        this._images = images;
        // Прорисовка для начального изображения
        this._drawMap();
    }

    get w() {
        return this._width;
    }

    // Заполнение цветом по координатам
    draw(x, y, color = null) {
        if (!color)
            color = MapOptions.color(Math.floor(x / this._width), Math.floor(y / this._width));
        this._context.fillStyle = color;
        this._context.fillRect(
            x + this._diff.x * this._width,
            y + this._diff.y * this._width,
            this._width,
            this._width,
        );
        if (MapOptions.isEnemy(Math.floor(x / this._width), Math.floor(y / this._width))) return;
        //  Рандомные темные точки
        this._context.fillStyle = this._makeColorDarker(color, 10);
        const pixelSize = this._width / 16;
        for (let i = 0; i < this._width / 8; i++)
            this._context.fillRect(
                x + this._diff.x * this._width + Math.random() * (this._width + 1 - pixelSize),
                y + this._diff.y * this._width + Math.random() * (this._width + 1 - pixelSize),
                pixelSize,
                pixelSize,
            );

        this._context.fillStyle = this._makeColorLighter(color, 10);
        for (let i = 0; i < this._width / 8; i++)
            this._context.fillRect(
                x + this._diff.x * this._width + Math.random() * (this._width + 1 - pixelSize),
                y + this._diff.y * this._width + Math.random() * (this._width + 1 - pixelSize),
                pixelSize,
                pixelSize,
            );
    }

    // Рисование картины по координатам
    drawImage(x, y, name) {
        if (y + this._diff.y * this._width == this._width * this._yCount)
            this._moveGameWindow('bottom');
        else if (y + this._diff.y * this._width < 0) this._moveGameWindow('top');
        else if (x + this._diff.x * this._width == this._width * this._xCount)
            this._moveGameWindow('right');
        else if (x + this._diff.x * this._width < 0) this._moveGameWindow('left');

        this._context.drawImage(
            this._images[name],
            x + this._diff.x * this._width,
            y + this._diff.y * this._width,
            this._width,
            this._width,
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
        this._context.fillStyle = 'white';
        this._context.fillRect(0, 0, this._xCount * this._width, this._width * this._yCount);
        map.forEach((value, y) => {
            value.forEach((val, x) => {
                if (
                    Math.abs(this._diff.x) <= x &&
                    x < this._xCount - this._diff.x &&
                    Math.abs(this._diff.y) <= y &&
                    y < this._yCount - this._diff.y
                ) {
                    this.draw(x * this._width, y * this._width);
                }
            });
        });
    }

    //  Затемнение цвета
    _makeColorDarker(color, value) {
        color = color.toLowerCase();
        let redValue, greenValue, blueValue;
        redValue = CONVERT_HEX_TO_DEC(color[1]) * 16 + CONVERT_HEX_TO_DEC(color[2]);
        greenValue = CONVERT_HEX_TO_DEC(color[3]) * 16 + CONVERT_HEX_TO_DEC(color[4]);
        blueValue = CONVERT_HEX_TO_DEC(color[5]) * 16 + CONVERT_HEX_TO_DEC(color[6]);
        redValue = redValue - value < 0 ? 0 : redValue - value;
        greenValue = greenValue - value < 0 ? 0 : greenValue - value;
        blueValue = blueValue - value < 0 ? 0 : blueValue - value;
        return (
            '#' +
            CONVERT_DEC_TO_HEX(redValue) +
            CONVERT_DEC_TO_HEX(greenValue) +
            CONVERT_DEC_TO_HEX(blueValue)
        );
    }

    //  Засветление цвета
    _makeColorLighter(color, value) {
        color = color.toLowerCase();
        let redValue, greenValue, blueValue;
        redValue = CONVERT_HEX_TO_DEC(color[1]) * 16 + CONVERT_HEX_TO_DEC(color[2]);
        greenValue = CONVERT_HEX_TO_DEC(color[3]) * 16 + CONVERT_HEX_TO_DEC(color[4]);
        blueValue = CONVERT_HEX_TO_DEC(color[5]) * 16 + CONVERT_HEX_TO_DEC(color[6]);
        redValue = redValue - value > 255 ? 255 : redValue + value;
        greenValue = greenValue - value > 255 ? 255 : greenValue + value;
        blueValue = blueValue - value > 255 ? 255 : blueValue + value;
        return (
            '#' +
            CONVERT_DEC_TO_HEX(redValue) +
            CONVERT_DEC_TO_HEX(greenValue) +
            CONVERT_DEC_TO_HEX(blueValue)
        );
    }
}
