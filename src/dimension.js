import map from './data/map';

export class MapOptions {
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

    static result(x, y) {
        return map[y][x];
    }
}
