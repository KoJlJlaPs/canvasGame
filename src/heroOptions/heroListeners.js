import { MapOptions } from '../mapOptions';
import { moveOnPath } from './pathOption';

// Установление обработчиков нажатия клавиш
export const setHeroEventListeners = (idName, hero, move, attack, size) => {
    let isKeyDown = false,
        isMouseClick = false;
    // Прослушивание нажатие на клавиш
    document.addEventListener('keydown', (e) => {
        if (isKeyDown) return;
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
            isKeyDown = true;
            move(startX, startY, endX, endY, () => {
                if (isKeyDown) isKeyDown = false;
            });
        }
    });

    // Прослушивание нажатие на левую кнопку мышки
    document.addEventListener('mousedown', (e) => {
        if (e.button != 0 || e.target.id !== idName) return;
        const x = Math.floor(e.offsetX / size),
            y = Math.floor(e.offsetY / size);

        const go = (x, y, func = null) => {
            moveOnPath(hero, move, x, y, () => {
                if (isMouseClick) isMouseClick = false;
                if (func) func();
            });
        };

        console.log(MapOptions.result(x, y));

        if (MapOptions.result(x, y) == 0) return;

        if (MapOptions.result(x, y) == 2) {
            if (hero.x < x - 1 || (hero.x === x - 1 && hero.y !== y)) {
                go(x - 1, y, attack);
            } else if (hero.x > x + 1 || (hero.x === x + 1 && hero.y !== y)) {
                go(x + 1, y, attack);
            } else {
                attack();
            }
        } else go(x, y);
    });
};
