// Установление обработчиков нажатия клавиш
export const setHeroEventListeners = (idName, hero, move) => {
    // Прослушивание нажатие на клавиш
    document.addEventListener('keydown', (e) => {
        const startX = hero.x;
        const startY = hero.y;
        switch (e.key) {
            // Вверх
            case 'ArrowUp':
            case 'w':
                hero.move.top();
                break;
            // Вниз
            case 'ArrowDown':
            case 's':
                hero.move.bottom();
                break;
            // Вправо
            case 'ArrowRight':
            case 'd':
                hero.move.right();
                break;
            // Влево
            case 'ArrowLeft':
            case 'a':
                hero.move.left();
                break;
            // Атака
            case 'e':
                attack();
            default:
                break;
        }
        const endX = hero.x;
        const endY = hero.y;
        if (startX !== endX || startY !== endY) move(startX, startY, endX, endY);
    });

    // Прослушивание нажатие на левую кнопку мышки
    // document.addEventListener('mousedown', (e) => {
    //     if (e.button != 0 || e.target.id !== idName) return;
    //     const x = Math.floor(e.offsetX / this._blockSize),
    //         y = Math.floor(e.offsetY / this._blockSize);

    //     if (MapOptions.result(x, y) == 0) return;

    //     if (MapOptions.result(x, y) == 2) {
    //         if (hero.x < x && hero.x !== x - 1 && hero.y !== y) {
    //             hero.go(x - 1, y, this._moveCharacter.bind(this), attack.bind(this));
    //         } else if (hero.x > x && hero.x !== x + 1 && hero.y !== y) {
    //             hero.go(x + 1, y, this._moveCharacter.bind(this), attack.bind(this));
    //         } else {
    //             attack();
    //         }
    //     } else hero.go(x, y, this._moveCharacter.bind(this));
    // });
};
