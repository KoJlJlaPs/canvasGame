import map from './data/map';

export class Draw {
    constructor(image, width, height = width) {
        this._count = 0;
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
        this._image = image;
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
            src = './image/main-image/main.png';
        }
        this._image.src = src;
        if (this._count == 0) {
            this._count++;
            this._image.onload = () =>
                this._context.drawImage(
                    this._image,
                    x + 1,
                    y + 1,
                    this._width - 1,
                    this._height - 1,
                );
            return;
        } else if (this._count == 1) this._image.onload = null;
        this._context.drawImage(this._image, x + 1, y + 1, this._width - 1, this._height - 1);
    }

    move(x1, x2, y1, y2) {
        if (this._isDrawing) return true;
        if (x1 == x2 && y1 == y2) return;
        let i = 1;
        this._context.fillStyle = '#5da130';
        const dx = x1 - x2;
        const dy = y1 - y2;
        let start;

        const dimensions = {
            right: {
                ac: (s) => (x1 += s),
                draw: () =>
                    this.drawImage(
                        Math.floor(x1),
                        Math.floor(y1),
                        startPath + 'right/' + i + '.png',
                    ),
                diff: () => x2 - x1,
            },
            left: {
                ac: (s) => (x1 -= s),
                draw: () =>
                    this.drawImage(
                        Math.floor(x1),
                        Math.floor(y1),
                        startPath + 'left/' + i + '.png',
                    ),
                diff: () => x1 - x2,
            },
            bottom: {
                ac: (s) => (y1 += s),
                draw: () =>
                    this.drawImage(
                        Math.floor(x1),
                        Math.floor(y1),
                        startPath + 'bottom/' + i + '.png',
                    ),
                diff: () => y2 - y1,
            },
            top: {
                ac: (s) => (y1 -= s),
                draw: () =>
                    this.drawImage(Math.floor(x1), Math.floor(y1), startPath + 'top/' + i + '.png'),
                diff: () => y1 - y2,
            },
        };

        const startPath = './image/main-image/';
        let action;
        if (dx < 0) action = dimensions.right;
        else if (dx > 0) action = dimensions.left;
        else if (dy < 0) action = dimensions.bottom;
        else action = dimensions.top;

        this._isDrawing = true;
        const draw = (time) => {
            if (x1 == x2 && y1 == y2) {
                this._isDrawing = false;
                return;
            }
            if (start === undefined) {
                start = time;
            }
            const periodWidth = Math.round(((time - start) * this._width) / 500);
            let stepWidth = Math.min(periodWidth, action.diff());
            this._context.fillRect(x1, y1, this._width, this._height);
            action.ac(stepWidth);
            i = Math.trunc(((this._width - action.diff()) * 7) / this._width) + 1;
            action.draw();
            start = time;
            window.requestAnimationFrame(draw);
        };
        window.requestAnimationFrame(draw);
    }

    clear(x, y) {
        this.draw(x, y, '#5da130');
    }
}
