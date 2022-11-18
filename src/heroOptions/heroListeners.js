// Установление обработчиков нажатия клавиш
export const setHeroEventListeners = (hero, moveFunction, attack, size, artist, idName) => {
    const move = (x1, y1, x2, y2, f) => {
        moveFunction(artist, x1 * size, x2 * size, y1 * size, y2 * size, f);
    };
    let isKeyDown = false;
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

    document.addEventListener('touchmove', (e) => {
        if (e.target.id !== idName) return;
    });
};
