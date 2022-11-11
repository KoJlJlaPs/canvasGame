import map from './data/map';

// Класс противников
export class Enemy {
    constructor(x, y, hp, damage) {
        this._hp = hp;
        this._y = y;
        this._x = x;
        this._damage = damage;
        this._status = 'alive';
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    // Получение количесество жизни противника
    get hp() {
        return this._hp;
    }

    // Получение урона
    takeDamage(man, damage) {
        this._hp -= damage;
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
                this.attack(man);
            }, 500);
        if (this._hp <= 0) this._status = 'died';
    }

    // Нанесение урона
    attack(man) {
        man.takeDamage(this._damage);
    }
}
