export function moveOnPath(hero, move, x2, y2, lastFunction) {
    if (hero.x === x2 && hero.y == y2) return;

    let path = getPath(hero.x, hero.y, x2, y2);
    let i = 0;

    const setMove = (hero, action) => {
        return hero[getMove(action)]();
    };

    function moving(hero, x = null, y = null) {
        if (!x && !y) {
            const startX = hero.x,
                startY = hero.y;
            if (setMove(hero, path[i])) {
                i++;
                moving(hero, startX, startY);
            } else {
                i++;
                path = [goOnReserveActive(path, i, hero), getPath(hero.x, hero.y, x2, y2)];
                moving(hero, startX, startY);
            }
        } else if (hero.x !== x || hero.y !== y) {
            move(x, y, hero.x, hero.y, () => {
                if (path.length == i) {
                    lastFunction();
                    return;
                }
                const startX = hero.x,
                    startY = hero.y;
                if (setMove(hero, path[i])) {
                    i++;
                    moving(hero, startX, startY);
                } else {
                    i = 1;
                    path = [goOnReserveActive(path, i, hero), getPath(hero.x, hero.y, x2, y2)];
                    moving(hero, startX, startY);
                }
            });
        }
    }
    moving(hero);
}

function getMove(action) {
    if (!action) debugger;
    if (action.x == undefined || action.x == 0) {
        if (action.y > 0) return 'bottom';
        else return 'top';
    }
    if (action.x > 0) return 'right';
    else return 'left';
}

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
    const endX = hero.x,
        endY = hero.y;
    return { x: endX - startX, y: endY - startY };
}

function getPath(x1, y1, x2, y2) {
    const dx = x2 - x1,
        dy = y2 - y1,
        path = [];

    for (let i = 0; i < Math.abs(dx); i++) {
        let rand = Math.floor(Math.random() * (Math.abs(dx) + Math.abs(dy)));
        while (path[rand]) rand = Math.floor(Math.random() * (Math.abs(dx) + Math.abs(dy)));
        path[rand] = { x: dx / Math.abs(dx) };
    }

    for (let i = 0; i < Math.abs(dx) + Math.abs(dy); i++)
        if (!path[i]) path[i] = { y: dy / Math.abs(dy) };

    return path;
}