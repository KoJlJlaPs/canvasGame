import { MapOptions } from './dimension';
import { Draw } from './draw';
import { Enemy } from './enemy';
import { Man } from './man';
import map from './data/map';

export class Main {
    constructor(blockSize) {
        this._blockSize = blockSize;
        this._draw = new Draw(blockSize);
        this._enemies = [];
        this._setEnemies();
    }

    setMainCharacter(x, y) {
        const mainCharacter = new Man(x, y);
        this._drawCharacter(x, y, true);

        const attack = () => {
            console.log('Attack');
            const enemy = this._getCloseEnemy(mainCharacter.x, mainCharacter.y);
            if (enemy && mainCharacter.attack(enemy)) {
                console.log('Died');
                this._clearCharacter(enemy.x, enemy.y);
                map[enemy.y][enemy.x] = 1;
                const index = this._enemies.findIndex(
                    (value) => value.x === enemy.x && value.y === enemy.y,
                );
                this._enemies.splice(index, 1);
            }
        };

        document.addEventListener('keydown', (e) => {
            this._keyDownFunction(attack, mainCharacter, e);
        });

        document.addEventListener('mouseup', (e) => {
            if (e.button != 0 || e.target.id !== 'game-field') return;
            const x = Math.floor(e.offsetX / this._blockSize),
                y = Math.floor(e.offsetY / this._blockSize);

            this._mouseUpFunction(x, y, attack, mainCharacter);
        });
    }

    _setEnemies() {
        map.forEach((element, i) => {
            element.forEach((el, j) => {
                if (el == 2) {
                    this._drawCharacter(j, i);
                    this._enemies.push(
                        new Enemy(i, j, this._clearCharacter.bind(this), this._enemies),
                    );
                }
            });
        });
    }

    _moveCharacter(startX, startY, endX, endY) {
        if (startX === endX && startY === endY) return;
        // this._draw.clear(startX * this._blockSize, startY * this._blockSize);
        // this._draw.drawImage(endX * this._blockSize, endY * this._blockSize, 'src/image/main');
        return this._draw.move(
            startX * this._blockSize,
            endX * this._blockSize,
            startY * this._blockSize,
            endY * this._blockSize,
        );
    }

    _drawCharacter(x, y, isMain) {
        this._draw.drawImage(x * this._blockSize, y * this._blockSize, isMain);
    }

    _clearCharacter(x, y) {
        this._draw.clear(x * this._blockSize, y * this._blockSize);
    }

    _getCloseEnemy(x, y) {
        const rightEnemy = this._enemies.find((value) => value.x == x + 1 && value.y == y);
        if (rightEnemy) return rightEnemy;
        const leftEnemy = this._enemies.find((value) => value.x == x - 1 && value.y == y);
        if (leftEnemy) return leftEnemy;
    }

    _keyDownFunction(attack, mainCharacter, e) {
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
            case 'e':
                attack();
            default:
                break;
        }
        const endX = mainCharacter.x;
        const endY = mainCharacter.y;
        if ((startX !== endX || startY !== endY) && this._moveCharacter(startX, startY, endX, endY))
            mainCharacter.cancelLastAction();
    }

    _mouseUpFunction(x, y, attack, mainCharacter) {
        if (!MapOptions.maybe(x, y)) return;

        if (MapOptions.maybe(x, y) == 2) {
            if (mainCharacter.x <= x) {
                if (mainCharacter.x !== x - 1 && mainCharacter.y !== y)
                    mainCharacter.go(x - 1, y, this._moveCharacter.bind(this), attack.bind(this));
                else {
                    attack();
                }
            }
        } else mainCharacter.go(x, y, this._moveCharacter.bind(this));
    }
}
