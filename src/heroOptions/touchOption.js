export class TouchMove {
    _coordinate = [];

    constructor(hero, move) {
        this._hero = hero;
        this._move = move;
        this._isMove = false;
    }

    setValues(x, y) {
        if (this._coordinate.length < 2) this._coordinate.push({ x, y });
    }

    move() {
        if (this._coordinate.length != 2 || this._isMove) return;
        const startX = this._hero.x,
            startY = this._hero.y;
        const dx = this._coordinate[1].x - this._coordinate[0].x;
        const dy = this._coordinate[1].y - this._coordinate[0].y;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) this._hero.left();
            else this._hero.right();
        } else {
            if (dy < 0) this._hero.top();
            else this._hero.bottom();
        }
        const endX = this._hero.x,
            endY = this._hero.y;

        if (startX != endX || startY != endY) {
            this._isMove = true;
            this._move(startX, startY, endX, endY, () => {
                this._isMove = false;
                this._coordinate = [];
            });
        }
        this._coordinate = [];
    }
}
