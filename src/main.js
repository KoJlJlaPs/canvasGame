import { MapOptions } from './dimension';
import { Draw } from './draw';
import { Enemy } from './enemy';
import { Man } from './man';
import map from './data/map';

export class Main {
    constructor(blockSize) {
        this._blockSize = blockSize;
        this._draw = new Draw(blockSize);
        this.enemies = [];
        this._setEnemies();
    }

    setMainCharacter(x, y) {
        const mainCharacter = new Man(x, y);
        this._draw.draw(x * this._blockSize, y * this._blockSize);
        document.addEventListener('keydown', (e) => {
            const startX = mainCharacter.x;
            const startY = mainCharacter.y;
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    mainCharacter.move('t');
                    break;
                case 'ArrowDown':
                case 's':
                    mainCharacter.move('b');
                    break;
                case 'ArrowRight':
                case 'd':
                    mainCharacter.move('r');
                    break;
                case 'ArrowLeft':
                case 'a':
                    mainCharacter.move('l');
                    break;

                default:
                    break;
            }
            const endX = mainCharacter.x;
            const endY = mainCharacter.y;
            if (startX !== endX || startY !== endY) this._drawCharacter(startX, startY, endX, endY);
            this.enemies.forEach((el) => el.go(endX, endY));
        });

        document.addEventListener('mouseup', (e) => {
            if (e.button != 0 || e.target.id !== 'game-field') return;
            const x = Math.floor(e.offsetX / this._blockSize),
                y = Math.floor(e.offsetY / this._blockSize);

            if (!MapOptions.maybe(x, y)) return;

            let fullPath = '';

            function getPath(x1, y1, x2, y2, firstActive = null) {
                let activeX, activeY;
                if (x1 > x2) activeX = 'l';
                else if (x1 < x2) activeX = 'r';
                if (y1 > y2) activeY = 't';
                else if (y1 < y2) activeY = 'b';

                const dx = Math.abs(x1 - x2);
                const dy = Math.abs(y1 - y2);
                let path = [];

                if (firstActive) {
                    path[0] = firstActive;

                    let i = 0;
                    if (firstActive == 'l' || firstActive == 'r') i = 1;

                    for (; i < dx; i++) {
                        let rand = Math.floor(Math.random() * (dx + dy));
                        while (path[rand]) rand = Math.floor(Math.random() * (dx + dy));
                        path[rand] = activeX;
                    }

                    for (let i = 1; i < dx + dy; i++) if (!path[i]) path[i] = activeY;
                    return path.join('');
                }

                for (let i = 0; i < dx; i++) {
                    let rand = Math.floor(Math.random() * (dx + dy));
                    while (path[rand]) rand = Math.floor(Math.random() * (dx + dy));
                    path[rand] = activeX;
                }

                for (let i = 0; i < dx + dy; i++) if (!path[i]) path[i] = activeY;
                return path.join('');
            }

            let path = getPath(mainCharacter.x, mainCharacter.y, x, y);

            if (this._interval) clearInterval(this._interval);
            let i = 0;
            this._interval = setInterval(() => {
                if (i == path.length) clearInterval(this._interval);
                const startX = mainCharacter.x;
                const startY = mainCharacter.y;
                const result = mainCharacter.move(path[i]);
                if (!result) {
                    switch (path[i]) {
                        case 'l':
                            if (fullPath[fullPath.length - 1] != 'b' && mainCharacter.move('top')) {
                                fullPath += 't';
                            } else if (mainCharacter.move('bottom')) {
                                fullPath += 'b';
                            }
                            break;
                        case 'r':
                            if (
                                fullPath[fullPath.length - 1] != 't' &&
                                mainCharacter.move('bottom')
                            ) {
                                fullPath += 'b';
                            } else if (mainCharacter.move('top')) {
                                fullPath += 't';
                            }
                            break;
                        case 't':
                            if (
                                fullPath[fullPath.length - 1] != 'l' &&
                                mainCharacter.move('right')
                            ) {
                                fullPath += 'r';
                            } else if (mainCharacter.move('left')) {
                                fullPath += 'l';
                            }
                            break;
                        case 'b':
                            if (
                                fullPath[fullPath.length - 1] != 'r' &&
                                mainCharacter.move('left')
                            ) {
                                fullPath += 'l';
                            } else if (mainCharacter.move('right')) {
                                fullPath += 'r';
                            }
                            break;

                        default:
                            break;
                    }
                    const endX = mainCharacter.x;
                    const endY = mainCharacter.y;

                    this._drawCharacter(startX, startY, endX, endY);
                    path = getPath(endX, endY, x, y, path[i]);
                    i = 0;
                    return;
                }
                const endX = mainCharacter.x;
                const endY = mainCharacter.y;
                this._drawCharacter(startX, startY, endX, endY);
                fullPath += path[i];
                i++;
            }, 250);
        });
    }

    _setEnemies() {
        map.forEach((element, i) => {
            element.forEach((el, j) => {
                if (el == 2) {
                    this._draw.draw(j * this._blockSize, i * this._blockSize);
                    this.enemies.push(new Enemy(i, j));
                }
            });
        });
    }

    _drawCharacter(startX, startY, endX, endY) {
        this._draw.clear(startX * this._blockSize, startY * this._blockSize);
        this._draw.draw(endX * this._blockSize, endY * this._blockSize);
    }
}
