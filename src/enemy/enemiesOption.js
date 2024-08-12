import oprtions from '../map/mapOptions';
import { map, g } from '../map/mapConfig';
const { getEnemyCoordinates } = oprtions;

export class EnemiesOptions {
    constructor(draw) {
        this._draw = draw;
        this._enemies = [];
        this._intervals = [];
        this._enemies = getEnemyCoordinates();
    }

    // Получение урона от главного героя
    takeDamage(hero) {
        let i;
        if ((i=this.getSameEnemy(hero.x,hero.y))==-1) return;
        const enemy = this._enemies[i];
        hero.attack(enemy);
        if (enemy.status == 'died') {
            this._enemies.splice(i, 1);
            map[enemy.y][enemy.x] = g;
            this._draw(enemy.x, enemy.y);
            return;
        }
        console.log('Hero attack!', enemy.hp);
        if (this._intervals[i]) return;
        this._intervals[i] = setInterval(() => {
            enemy.attack(hero);
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
            console.log('Enemy attack!', hero.hp);
        }, enemy.time);
    }

    getSameEnemy(x, y) {
        return this._enemies.findIndex((value) => {
            if (((value.x + 1) == x || (value.x - 1) == x) && value.y == y) return true;
        });
    }
}
