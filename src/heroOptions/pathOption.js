export function moveOnPath(hero, move, x2, y2, lastFunction) {
    if (hero.x === x2 && hero.y == y2) return;

    let path = getPath(hero.x, hero.y, x2, y2);
    let i = 0;

    // Изменение координат героя
    const setMove = (hero, action) => {
        return hero[getMove(action)]();
    };

    // Проведение перемещения на 1 шаг персонажа
    const setMoving = () => {
        const startX = hero.x,
            startY = hero.y;
        if (setMove(hero, path[i]) !== undefined) {
            i++;
            moving(hero, startX, startY);
        } else {
            i = 1;
            const reserv = goOnReserveActive(path, i, hero);
            path = [reserv, ...getPath(hero.x, hero.y, x2, y2, reserv)];
            moving(hero, startX, startY);
        }
    };

    // Функция для преодоления пути
    function moving(hero, x = null, y = null) {
        if (x == null && y == null) setMoving();
        else if (hero.x !== x || hero.y !== y) {
            move(x, y, hero.x, hero.y, () => {
                if (path.length == i) return lastFunction();
                setMoving();
            });
        }
    }
    // Вызов функции
    moving(hero);
}

// Получение направление шага
function getMove(action) {
    if (action.x == undefined || action.x == 0) {
        if (action.y > 0) return 'bottom';
        else return 'top';
    }
    if (action.x > 0) return 'right';
    else return 'left';
}

// Поиск запасного хода
function goOnReserveActive(path, i, hero) {
    let lastAction;
    if (i !== 0) lastAction = getMove(path[i - 1]);
    const startX = hero.x,
        startY = hero.y;
    switch (getMove(path[i])[0]) {
        case 'l':
            lastAction !== 'bottom' && hero.top() ? null : hero.bottom() ?? hero.right();
            break;
        case 'r':
            lastAction !== 'top' && hero.bottom() ? null : hero.top() ?? hero.left();
            break;
        case 't':
            lastAction !== 'left' && hero.right() ? null : hero.left() ?? hero.bottom();
            break;
        case 'b':
            lastAction !== 'right' && hero.left() ? null : hero.right() ?? hero.top();
            break;
        default:
            break;
    }
    return { x: hero.x - startX, y: hero.y - startY };
}

// Создание пути
function getPath(x1, y1, x2, y2, lastAction = null) {
    const dx = x2 - x1,
        dy = y2 - y1,
        path = [],
        x = dx / Math.abs(dx),
        y = dy / Math.abs(dy);

    for (let i = 0; i < Math.abs(dx); i++) {
        let rand = Math.floor(Math.random() * (Math.abs(dx) + Math.abs(dy)));
        while (path[rand]) rand = Math.floor(Math.random() * (Math.abs(dx) + Math.abs(dy)));
        path[rand] = { x };
    }

    for (let i = 0; i < Math.abs(dx) + Math.abs(dy); i++) if (!path[i]) path[i] = { y };

    if (lastAction) {
        if (lastAction.x && !path[0].y) {
            path[path.findIndex((value) => value.y)] = { x };
            path[0] = { y };
        } else if (lastAction.y && !path[0].x) {
            path[path.findIndex((value) => value.x)] = { y };
            path[0] = { x };
        }
    }
    return path;
}
