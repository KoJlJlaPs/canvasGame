import map from './data/map';

export class Draw {
    constructor(width, height = width) {
        const canvas = document.getElementById('game-field');
        this._context = canvas.getContext('2d');
        this._width = width;
        this._height = height;
        map.forEach((value, i) => {
            value.forEach((val, j) => {
                if (val == 0) this.draw(j * width, i * width, 'rgb(200,0,0)');
            });
        });
    }

    draw(x, y, color = 'black') {
        this._context.strokeStyle = color;
        this._context.strokeRect(x, y, this._width, this._height);
    }

    clear(x, y) {
        this._context.clearRect(x - 1, y - 1, this._width + 2, this._height + 2);
        this._drawWhenClear();
    }

    _drawWhenClear() {
        map.forEach((value, i) => {
            value.forEach((val, j) => {
                if (val == 0) this.draw(j * this._width, i * this._width, 'rgb(200,0,0)');
                if (val == 2) this.draw(j * this._width, i * this._width);
            });
        });
    }
}
