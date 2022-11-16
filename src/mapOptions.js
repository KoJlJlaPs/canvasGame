import { map, color } from './data/map';

// Опции по карте на игре
export class MapOptions {
    // Проверка на возможность перемещения в точку
    static can(active, x, y) {
        switch (active) {
            case 'right':
                return x < map[0].length - 1 && map[y][x + 1] === 1;
            case 'left':
                return x > 0 && map[y][x - 1] === 1;
            case 'top':
                return y > 0 && map[y - 1][x] === 1;
            case 'bottom':
                return y < map.length - 1 && map[y + 1][x] === 1;
            default:
                return false;
        }
    }

    // Получить тип блока по координатам
    static result(x, y) {
        return map[y][x];
    }

    // Получить цвет по координатам
    static color(x, y) {
        if (map[y][x] == undefined) return 'white';
        return color[map[y][x]];
    }
}
