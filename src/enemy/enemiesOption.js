import { map } from '../data/map';
import { Enemy } from './enemy';

export class Enemies {
    constructor(draw) {
        this._draw = draw;
        this._enemies = [];
        this._intervals = [];
        map.forEach((row, i) => {
            row.forEach((val, j) => {
                if (val == 2) {
                    this._enemies.push(new Enemy(j, i, 100, 10));
                    draw(j, i, 'blue');
                }
            });
        });
    }

    // Получение урона от главного героя
    takeDamage(hero) {
        const x1 = hero.x + 1,
            x2 = hero.x - 1,
            y = hero.y;
        const i = this._enemies.findIndex(
            (value) => (value.x === x1 || value.x === x2) && value.y === y,
        );
        if (i == -1) return;
        const enemy = this._enemies[i];
        if (enemy.status == 'died') {
            this._enemies.splice(i, 1);
            map[enemy.y][enemy.x] = 1;
            this._draw(enemy.x, enemy.y);
            return;
        }
        hero.attack(enemy);
        console.log('Hero attack!');
        if (this._intervals[i]) return;
        this._intervals[i] = setInterval(() => {
            if (
                hero.status === 'died' ||
                enemy.x - 1 > hero.x ||
                enemy.x + 1 < hero.x ||
                enemy.y !== hero.y ||
                enemy.status === 'died'
            ) {
                clearInterval(this._intervals[i]);
                this._intervals[i] = undefined;
                return;
            }
            enemy.attack(hero);
            console.log('Enemy attack!');
        }, enemy.time);
    }

    getSameEnemy(x, y) {
        return this._enemies.find((value) => {
            if ((value.x + 1 == x || value.x - 1 == x) && value.y == y) return true;
        });
    }
}
