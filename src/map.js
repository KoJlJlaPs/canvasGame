import map from './data/map';
import { Dimension } from './dimension';
import { Man } from './man';

export class Character {
    _time = 500;
    constructor(x, y, blockSize = 75) {
        this._x = x;
        this._y = y;
        this._size = blockSize;
        this._man = new Man(blockSize, blockSize, x, y);
        this._left = new Dimension('left', this._man);
        this._right = new Dimension('right', this._man);
        this._bottom = new Dimension('bottom', this._man);
        this._top = new Dimension('top', this._man);
    }

    async asyncRight() {
        await this._timepause(() => {
            this._setMove(this._right);
        });
    }

    async asyncLeft() {
        await this._timepause(() => {
            this._setMove(this._left);
        });
    }

    async asyncBottom() {
        await this._timepause(() => {
            this._setMove(this._bottom);
        });
    }

    async asyncTop() {
        await this._timepause(() => {
            this._setMove(this._top);
        });
    }

    async go(x, y) {
        const blockX = Math.floor(x / this._size);
        const blockY = Math.floor(y / this._size);
        if (map[blockY][blockX]) {
            await new Promise(() => {
                if (this._interval) {
                    clearInterval(this._interval);
                }
                this._interval = setInterval(() => {
                    if (this._x !== blockX || this._y !== blockY) {
                        let right = false;
                        let left = false;
                        let top = false;
                        if (this._y < blockY) {
                            if (this._setMove(this._bottom)) {
                            } else if (this._setMove(this._right)) {
                                right = true;
                            } else if (this._setMove(this._top)) {
                                top = true;
                            } else if (this._setMove(this._left)) {
                                left = true;
                            } else clearInterval(this._interval);
                        }
                        if (!top && this._y > blockY) {
                            if (this._setMove(this._top)) {
                            } else if (this._setMove(this._left)) {
                                left = true;
                            } else if (this._setMove(this._bottom)) {
                            } else if (this._setMove(this._right)) {
                                right = true;
                            } else clearInterval(this._interval);
                        }
                        if (!left && this._x < blockX) {
                            if (this._setMove(this._right)) {
                            } else if (this._setMove(this._top)) {
                            } else if (this._setMove(this._left)) {
                            } else if (this._setMove(this._bottom)) {
                            } else clearInterval(this._interval);
                        }
                        if (!right && this._x > blockX) {
                            if (this._setMove(this._left)) {
                            } else if (this._setMove(this._bottom)) {
                            } else if (this._setMove(this._right)) {
                            } else if (this._setMove(this._top)) {
                            } else clearInterval(this._interval);
                        }
                    } else clearInterval(this._interval);
                }, this._time);
            });
        }
    }

    async _timepause(func) {
        const bind = func.bind(this);
        await new Promise(() => setTimeout(() => bind(), this._time));
    }

    _setMove(dimension) {
        const move = dimension.move(this._x, this._y);
        if (!move) return;
        this._y = move.y;
        this._x = move.x;
        return true;
    }
}
