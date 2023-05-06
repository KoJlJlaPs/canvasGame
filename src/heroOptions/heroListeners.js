import { TouchMove } from './touchOption';
import SecondCounter from '../secondCounter';

const START_MOVE_STATE = 1;
const END_MOVE_STATE = 2;
const MIN_TIME_FOR_CONTINUOSLY_MS = 100;

// Установление обработчиков нажатия клавиш
export const setHeroEventListeners = (hero, moveFunction, attack, size, artist) => {
    const seconder = new SecondCounter();
    const move = (x1, y1, x2, y2, f) => {
        moveFunction(artist, x1 * size, x2 * size, y1 * size, y2 * size, f);
    };

    //  Проверка на бездействие персонажа
    let isStopDrawImage;
    let continuoslyInterval;

    let isKeyDown = false;
    // Прослушивание нажатие на клавиш
    document.addEventListener('keydown', (e) => {
        if (isKeyDown) return;

        //  Остановление секундомера окончание бездействия
        seconder.stop();
        isStopDrawImage = false;
        clearInterval(continuoslyInterval);

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

                //  Запуск секундомера для начала замера бездействия
                seconder.start();

                continuoslyInterval = setInterval(() => {
                    if (seconder.getTime() > MIN_TIME_FOR_CONTINUOSLY_MS && !isStopDrawImage) {
                        artist.draw(hero.x * size, hero.y * size);
                        artist.drawImage(hero.x * size, hero.y * size, 'bottom-1');
                        isStopDrawImage = true;
                    }
                }, 10);
            });
        }
    });

    // Добавление функции перемещения персонажа на телефоне
    const touch = new TouchMove(hero, move);
    document.addEventListener('touchmove', (e) => {
        const x = e.touches.item(0).clientX,
            y = e.touches.item(0).clientY;
        touch.setValues(x, y);
        touch.move();
    });
};
