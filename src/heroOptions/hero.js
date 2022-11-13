import { MapOptions } from '../mapOptions';

// Класс Главного героя
export class Hero {
    constructor(hp, damage, x, y) {
        this._hp = hp;
        this._status = 'alive';
        this._damage = damage;
        this._x = x;
        this._y = y;
    }

    // Получение координат
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    // Получение количество жизней главного героя
    get hp() {
        return this._hp;
    }

    // Получение статуса главного героя
    get status() {
        return this._status;
    }

    // Получение урона
    takeDamage(damage) {
        this._hp -= damage;
        if (this._hp <= 0) this._status = 'died';
    }

    // Атака на врага
    attack(man) {
        man.takeDamage(this._damage);
    }

    // Передвижение

    left() {
        if (MapOptions.can('left', this._x, this._y)) return this._x--;
    }
    right() {
        if (MapOptions.can('right', this._x, this._y)) return this._x++;
    }
    top() {
        if (MapOptions.can('top', this._x, this._y)) return this._y--;
    }
    bottom() {
        if (MapOptions.can('bottom', this._x, this._y)) return this._y++;
    }
}
