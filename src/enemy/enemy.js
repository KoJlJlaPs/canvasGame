import map from '../data/map';

// Класс противников
export class Enemy {
    constructor(x, y, hp, damage, time = 500) {
        this._hp = hp;
        this._y = y;
        this._x = x;
        this._damage = damage;
        this._status = 'alive';
        this._time = time;
    }

    // Получение координат
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

    //Время на паузу при атаке
    get time() {
        return this._time;
    }

    // Получить статус персонажа
    get status() {
        return this._status;
    }

    // Получение урона
    takeDamage(damage) {
        this._hp -= damage;
        if (this._hp <= 0) this._status = 'died';
    }

    // Нанесение урона
    attack(man) {
        man.takeDamage(this._damage);
    }
}
