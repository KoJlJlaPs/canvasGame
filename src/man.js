const canvas = document.getElementById('game-field');
const context = canvas.getContext('2d');

export class Man {
    constructor(width = 75, height = 75, startX = 7, startY = 5) {
        this._height = height;
        this._width = width;
        this._x = convertBoxInPixel(startX, width);
        this._y = convertBoxInPixel(startY, width);
        drawRect(this._x, this._y, this._width, this._height);
    }

    moveToLeft() {
        clearRect(this._x, this._y, this._width, this._height);
        this._x -= convertBoxInPixel(1, this._width);
        drawRect(this._x, this._y, this._width, this._height);
    }

    moveToRight() {
        clearRect(this._x, this._y, this._width, this._height);
        this._x += convertBoxInPixel(1, this._width);
        drawRect(this._x, this._y, this._width, this._height);
    }

    moveToTop() {
        clearRect(this._x, this._y, this._width, this._height);
        this._y -= convertBoxInPixel(1, this._width);
        drawRect(this._x, this._y, this._width, this._height);
    }

    moveToBottom() {
        clearRect(this._x, this._y, this._width, this._height);
        this._y += convertBoxInPixel(1, this._width);
        drawRect(this._x, this._y, this._width, this._height);
    }
}

function clearRect(x, y, w, h) {
    context.clearRect(x - 1, y - 1, w + 2, h + 2);
}

function drawRect(x, y, w, h) {
    context.strokeRect(x, y, w, h);
}

function convertBoxInPixel(count, width) {
    return count * width;
}
