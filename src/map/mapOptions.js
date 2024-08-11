import place from './place';
import { map } from './mapConfig';
import { Enemy } from '../enemy/enemy';

function result(y, x) {
    return place.isCanPlace(map[y][x]);
}

function can(active, x, y) {
    switch (active) {
        case 'right':
            return x < map[0].length - 1 && result(y, x + 1);
        case 'left':
            return x > 0 && result(y, x - 1);
        case 'top':
            return y > 0 && result(y - 1, x);
        case 'bottom':
            return y < map.length - 1 && result(y + 1, x);
        default:
            return false;
    }
}
function isEnemy(x, y) {
    return place.isEnemyPlace(map[y][x]);
}

function getEnemyCoordinates() {
    const enemies = [];
    map.forEach((row, i) =>
        row.forEach((val, j) => {
            if (isEnemy(j, i)) enemies.push(new Enemy(j, i, 100, 10));
        }),
    );
    return enemies;
}

// Получить цвет по координатам
function color(x, y) {
    return place.getColor(map[y][x]);
}
// Опции по карте на игре
export default {
    can,
    isEnemy,
    color,
    getEnemyCoordinates,
};
