import { MapOptions } from './dimension';

export class Man {
    constructor(startX = 7, startY = 5) {
        this._x = startX;
        this._y = startY;
        this._hp = 1000;
        this._el = document.getElementById('you');
        this._el.textContent = this._hp;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get hp() {
        return this._hp;
    }

    move(active) {
        this._lastAction = active;
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

    go(x, y, draw, endFunc = null) {
        this._lastDimension = '';

        let path = getPath(this._x, this._y, x, y);

        if (this._interval) clearInterval(this._interval);
        let i = 0;
        this._interval = setInterval(() => {
            if (i == path.length) {
                clearInterval(this._interval);
                if (endFunc) endFunc();
            }
            const startX = this._x;
            const startY = this._y;
            const result = this.move(path[i]);
            if (!result) {
                this._goOnReserveActive(path[i]);
                const endX = this._x;
                const endY = this._y;

                if (draw(startX, startY, endX, endY)) {
                    this.cancelLastAction();
                    return;
                }
                path = getContinuation(path[i], endX, endY, x, y);
                i = 0;
                return;
            }
            const endX = this._x;
            const endY = this._y;
            if (draw(startX, startY, endX, endY)) {
                this.cancelLastAction();
                return;
            }
            this._lastDimension = path[i];
            i++;
        }, 500);
    }

    attack(enemy) {
        return enemy.takeDamage(this, 10);
    }

    takeDamage(damage) {
        this._hp -= damage;
        this._el.textContent = this._hp;
        if (this._hp <= 0) return true;
    }

    cancelLastAction() {
        switch (this._lastAction) {
            case 'l':
            case 'left':
                return this.move('r');
            case 'r':
            case 'right':
                return this.move('l');
            case 't':
            case 'top':
                return this.move('b');
            case 'b':
            case 'bottom':
                return this.move('t');
            default:
                break;
        }
    }

    _goOnReserveActive(active) {
        switch (active) {
            case 'l':
                if (this._lastDimension != 'b' && this.move('top')) {
                    this._lastDimension = 't';
                } else if (this.move('bottom')) {
                    this._lastDimension = 'b';
                }
                break;
            case 'r':
                if (this._lastDimension != 't' && this.move('bottom')) {
                    this._lastDimension = 'b';
                } else if (this.move('top')) {
                    this._lastDimension = 't';
                }
                break;
            case 't':
                if (this._lastDimension != 'l' && this.move('right')) {
                    this._lastDimension = 'r';
                } else if (this.move('left')) {
                    this._lastDimension = 'l';
                }
                break;
            case 'b':
                if (this._lastDimension != 'r' && this.move('left')) {
                    this._lastDimension = 'l';
                } else if (this.move('right')) {
                    this._lastDimension = 'r';
                }
                break;

            default:
                break;
        }
    }
}

function getCoordinateOption(x1, y1, x2, y2) {
    let activeX, activeY;
    if (x1 > x2) activeX = 'l';
    else if (x1 < x2) activeX = 'r';
    if (y1 > y2) activeY = 't';
    else if (y1 < y2) activeY = 'b';

    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);
    return { activeX, activeY, dx, dy };
}

function getContinuation(ac, ...props) {
    const { dx, dy, activeX, activeY } = getCoordinateOption(...props);
    let path = [ac];

    for (let i = ac == 'l' || ac == 'r' ? 1 : 0; i < dx; i++) {
        let rand = Math.floor(Math.random() * (dx + dy));
        while (path[rand]) rand = Math.floor(Math.random() * (dx + dy));
        path[rand] = activeX;
    }

    for (let i = 1; i < dx + dy; i++) if (!path[i]) path[i] = activeY;
    return path.join('');
}

function getPath(...props) {
    const { dx, dy, activeX, activeY } = getCoordinateOption(...props);
    let path = [];

    for (let i = 0; i < dx; i++) {
        let rand = Math.floor(Math.random() * (dx + dy));
        while (path[rand]) rand = Math.floor(Math.random() * (dx + dy));
        path[rand] = activeX;
    }

    for (let i = 0; i < dx + dy; i++) if (!path[i]) path[i] = activeY;
    return path.join('');
}
