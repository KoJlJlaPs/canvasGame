let isDrawing = false;
// Проведение анимационного перехода
export function MoveOption(artist, x1, x2, y1, y2) {
    if (isDrawing) return true;
    if (x1 == x2 && y1 == y2) return;

    const dx = x1 - x2;
    const dy = y1 - y2;
    // Направление движений
    const dimensions = {
        right: {
            ac: (s) => {
                x1 += s;
                return { x1, y1 };
            },
            draw: (i) => artist.drawImage(x1, y1, 'right-' + i),
            diff: () => x2 - x1,
        },
        left: {
            ac: (s) => {
                x1 -= s;
                return { x1, y1 };
            },
            draw: (i) => artist.drawImage(x1, y1, 'left-' + i),
            diff: () => x1 - x2,
        },
        bottom: {
            ac: (s) => {
                y1 += s;
                return { x1, y1 };
            },
            draw: (i) => artist.drawImage(x1, y1, 'bottom-' + i),
            diff: () => y2 - y1,
        },
        top: {
            ac: (s) => {
                y1 -= s;
                return { x1, y1 };
            },
            draw: (i) => artist.drawImage(x1, y1, 'top-' + i),
            diff: () => y1 - y2,
        },
    };
    let action;
    if (dx < 0) action = dimensions.right;
    else if (dx > 0) action = dimensions.left;
    else if (dy < 0) action = dimensions.bottom;
    else action = dimensions.top;

    let i = 1;
    let start;
    isDrawing = true;

    // Прорисовка анимации
    const draw = (time) => {
        if (x1 == x2 && y1 == y2) {
            isDrawing = false;
            return;
        }
        if (start === undefined) start = time;

        // Получение длину перехода
        const periodWidth = Math.round(((time - start) * artist.w) / 500);
        let stepWidth = Math.min(periodWidth, action.diff());

        //Очищение территории на холсте по координатам
        artist.clear(x1, y1);

        // Изменение координат
        const coor = action.ac(stepWidth);
        x1 = coor.x1;
        y1 = coor.y1;
        // Получение номер кадра
        i = Math.trunc(((artist.w - action.diff()) * 7) / artist.w) + 1;
        // Отображение кадра на холсте
        action.draw(i);

        start = time;
        window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
}

// Получение направление перемещения
function getAction(x1, x2, y1, y2, artist) {}
