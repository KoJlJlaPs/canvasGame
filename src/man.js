import { MapOptions } from './dimension';

export class Man {
    constructor(startX = 7, startY = 5) {
        this._x = startX;
        this._y = startY;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    move(active) {
        switch (active) {
            case 'l':
            case 'left':
                if (MapOptions.can('left', this._x, this._y)) {
                    this._x--;
                    return true;
                }
                return false;

            case 'r':
            case 'right':
                if (MapOptions.can('right', this._x, this._y)) {
                    this._x++;
                    return true;
                }
                return false;
            case 't':
            case 'top':
                if (MapOptions.can('top', this._x, this._y)) {
                    this._y--;
                    return true;
                }
                return false;
            case 'b':
            case 'bottom':
                if (MapOptions.can('bottom', this._x, this._y)) {
                    this._y++;
                    return true;
                }
                return false;

            default:
                break;
        }
    }
}
