import map from './data/map';

export class Enemy {
    constructor(y, x) {
        this._hp = 100;
        this._y = y;
        this._x = x;
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

    takeDamage(man, damage) {
        this._hp -= damage;
        console.log(this._hp);
        if (!this._interval)
            this._interval = setInterval(() => {
                if (
                    (man.x + 1 !== this._x && man.x - 1 !== this._x) ||
                    man.y !== this._y ||
                    man.hp === 0 ||
                    this._hp === 0
                ) {
                    clearInterval(this._interval);
                    this._interval = null;
                    return;
                }
                man.takeDamage(10);
            }, 500);
        if (this._hp <= 0) return true;
    }
}
