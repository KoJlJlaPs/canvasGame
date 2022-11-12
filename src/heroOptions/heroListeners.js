import { MapOptions } from '../mapOptions';
import { moveOnPath } from './pathOptions';

// Установление обработчиков нажатия клавиш
export const setHeroEventListeners = (idName, hero, move, size) => {
    let isClick = false;
    // Прослушивание нажатие на клавиш
    document.addEventListener('keydown', (e) => {
        if (isClick) return;
        const startX = hero.x;
        const startY = hero.y;
        switch (e.key) {
            // Вверх
            case 'ArrowUp':
            case 'w':
                hero.top();
                break;
            // Вниз
            case 'ArrowDown':
            case 's':
                hero.bottom();
                break;
            // Вправо
            case 'ArrowRight':
            case 'd':
                hero.right();
                break;
            // Влево
            case 'ArrowLeft':
            case 'a':
                hero.left();
                break;
            // Атака
            case 'e':
                attack();
            default:
                break;
        }
        const endX = hero.x;
        const endY = hero.y;
        if (startX !== endX || startY !== endY) {
            isClick = true;
            move(startX, startY, endX, endY, () => {
                if (isClick) isClick = false;
            });
        }
    });

    // Прослушивание нажатие на левую кнопку мышки
    document.addEventListener('mousedown', (e) => {
        if (e.button != 0 || e.target.id !== idName) return;
        const x = Math.floor(e.offsetX / size),
            y = Math.floor(e.offsetY / size);

        if (MapOptions.result(x, y) == 0) return;

        if (MapOptions.result(x, y) == 2) {
            // if (hero.x < x && hero.x !== x - 1 && hero.y !== y) {
            //     hero.go(x - 1, y, this._moveCharacter.bind(this), attack.bind(this));
            // } else if (hero.x > x && hero.x !== x + 1 && hero.y !== y) {
            //     hero.go(x + 1, y, this._moveCharacter.bind(this), attack.bind(this));
            // } else {
            //     attack();
            // }
        } else moveOnPath(hero, move, x, y);
    });
};
