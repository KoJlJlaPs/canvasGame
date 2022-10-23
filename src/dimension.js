import map from './data/map';

export class Dimension {
    constructor(active, man) {
        this._active = active;
        this._man = man;
    }

    can(x, y) {
        switch (this._active) {
            case 'right':
                return x < map[0].length - 1 && map[y][x + 1];
            case 'left':
                return x > 0 && map[y][x - 1];
            case 'top':
                return y > 0 && map[y - 1][x];
            case 'bottom':
                return y < map.length - 1 && map[y + 1][x];
            default:
                return false;
        }
    }

    move(x, y) {
        if (this.can(x, y)) {
            switch (this._active) {
                case 'right':
                    x += 1;
                    this._man.moveToRight();
                    return { x, y };
                case 'left':
                    x -= 1;
                    this._man.moveToLeft();
                    return { x, y };
                case 'top':
                    y -= 1;
                    this._man.moveToTop();
                    return { x, y };
                case 'bottom':
                    y += 1;
                    this._man.moveToBottom();
                    return { x, y };
                default:
                    return false;
            }
        }
    }
}
