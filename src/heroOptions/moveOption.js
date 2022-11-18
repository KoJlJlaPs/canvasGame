import { drawAnimate } from './animateOption';

// Проведение анимационного перехода
export function MoveOption(artist, x1, x2, y1, y2, func) {
    if (x1 == x2 && y1 == y2) return;

    const dx = x1 - x2;
    const dy = y1 - y2;
    // Направление движений
    const dimensions = {
        right: {
            ac: (s) => {
                x1 += s;
            },
            draw: (i) => artist.drawImage(x1, y1, 'right-' + i),
            diff: () => x2 - x1,
        },
        left: {
            ac: (s) => {
                x1 -= s;
            },
            draw: (i) => artist.drawImage(x1, y1, 'left-' + i),
            diff: () => x1 - x2,
        },
        bottom: {
            ac: (s) => {
                y1 += s;
            },
            draw: (i) => artist.drawImage(x1, y1, 'bottom-' + i),
            diff: () => y2 - y1,
        },
        top: {
            ac: (s) => {
                y1 -= s;
            },
            draw: (i) => artist.drawImage(x1, y1, 'top-' + i),
            diff: () => y1 - y2,
        },
    };
    let action,
        i = 1;
    if (dx < 0) action = dimensions.right;
    else if (dx > 0) action = dimensions.left;
    else if (dy < 0) action = dimensions.bottom;
    else action = dimensions.top;

    // Прорисовка анимации
    drawAnimate((diff) => {
        if (x1 == x2 && y1 == y2) return true;
        // Получение длину перехода
        const periodWidth = Math.round((diff * artist.w) / 500);
        let stepWidth = Math.min(periodWidth, action.diff());
        //Очищение территории на холсте по координатам
        artist.draw(x1, y1);
        // Изменение координат
        action.ac(stepWidth);
        // Получение номер кадра
        i = Math.trunc(((artist.w - action.diff()) * 7) / artist.w) + 1;
        // Отображение кадра на холсте
        action.draw(i);
        return false;
    }, func);
}
