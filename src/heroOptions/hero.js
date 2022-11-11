import { MapOptions } from '../mapOptions';
import { MoveOption } from './moveOption';

// Класс Главного героя
export class Hero {
    constructor(hp, attack, x, y) {
        this._hp = hp;
        this._status = 'alive';
        this._attack = attack;
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    // Получение урона
    takeDamage(damage) {
        this._hp -= damage;
        if (this._hp <= 0) this._status = 'died';
    }

    // Атака на врага
    attack(man) {
        man.takeDamage(this._attack);
    }

    // Передвижение
    move = {
        left: (() => {
            if (MapOptions.can('left', this._x, this._y)) this._x--;
        }).bind(this),
        right: (() => {
            if (MapOptions.can('right', this._x, this._y)) this._x++;
        }).bind(this),
        top: (() => {
            if (MapOptions.can('top', this._x, this._y)) this._y--;
        }).bind(this),
        bottom: (() => {
            if (MapOptions.can('bottom', this._x, this._y)) this._y++;
        }).bind(this),
    };
}
