import map from './data/map';

export class Draw {
    constructor(width, height = width) {
        const canvas = document.getElementById('game-field');
        this._context = canvas.getContext('2d');
        this._width = width;
        this._height = height;
        map.forEach((value, i) => {
            value.forEach((val, j) => {
                if (val == 0) this.draw(j * width, i * width, '#a2653e');
                if (val == 1) this.draw(j * width, i * height, '#5da130');
            });
        });
    }

    draw(x, y, color) {
        this._context.fillStyle = color;
        this._context.fillRect(x, y, this._width, this._height);
    }

    drawImage(x, y, src = null) {
        if (src === null) {
            this.draw(x, y, 'black');
            return;
        }
        if (src === true) {
            src = './image/main.png';
        }
        const image = new Image(this._width, this._height);
        image.src = src;
        image.onload = () => {
            this._context.drawImage(image, x + 1, y + 1, this._width - 1, this._height - 1);
        };
    }

    move(x1, x2, y1, y2) {
        if (this._interval) return true;
        this._context.fillStyle = '#5da130';
        let i = 1;
        const dx = x1 - x2;
        const dy = y1 - y2;
        const startPath = './image/maingo/';
        let action = () => {};
        if (dx < 0)
            action = () => {
                x1 += this._width / 8;
                this.drawImage(Math.floor(x1), Math.floor(y1), startPath + 'right/' + i + '.png');
            };
        else if (dx > 0)
            action = () => {
                x1 -= this._width / 8;
                this.drawImage(Math.floor(x1), Math.floor(y1), startPath + 'left/' + i + '.png');
            };
        else if (dy < 0)
            action = () => {
                y1 += this._width / 8;
                this.drawImage(Math.floor(x1), Math.floor(y1), startPath + 'bottom/' + i + '.png');
            };
        else if (dy > 0)
            action = () => {
                y1 -= this._width / 8;
                this.drawImage(Math.floor(x1), Math.floor(y1), startPath + 'top/' + i + '.png');
            };

        this._interval = setInterval(() => {
            if (i === 9) {
                clearInterval(this._interval);
                this._interval = null;
                return;
            }
            this._context.fillRect(x1, y1, this._width, this._height);
            if (i === 8) {
                this.drawImage(x2, y2, true);
            } else action();
            i++;
        }, 500 / 8);
    }

    clear(x, y) {
        this.draw(x, y, '#5da130');
    }
}
