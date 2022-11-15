import { DrawOptions } from './drawOptions';
import { Enemies as EnemiesOption } from './enemy/enemiesOption';
import { drawAnimate } from './heroOptions/animateOption';
import { Hero } from './heroOptions/hero';
import { setHeroEventListeners } from './heroOptions/heroListeners';
import { MoveOption } from './heroOptions/moveOption';

// Класс Логики Игры
export class Game {
    constructor(blockSize, idName, images) {
        this._size = blockSize;
        this._idName = idName;
        this._artist = new DrawOptions(blockSize, idName, images);
        // Добавление врагов
        this._enemiesOption = new EnemiesOption((x, y, color) =>
            this._artist.draw(x * this._size, y * this._size, color),
        );
    }

    //Добавление главного игрока
    setMainHero(x, y) {
        this._hero = new Hero(1000, 10, x, y);
        let animateEnd = true;
        setHeroEventListeners(
            this._idName,
            this._hero,
            (x1, y1, x2, y2, f) => {
                MoveOption(
                    this._artist,
                    x1 * this._size,
                    x2 * this._size,
                    y1 * this._size,
                    y2 * this._size,
                    f,
                );
            },
            () => {
                if (!animateEnd) return;
                animateEnd = false;
                let time = 0;
                let heroAttackTime = 250;
                let i = 1;
                drawAnimate(
                    (diff) => {
                        let cadrNumber = Math.round((5 * time) / heroAttackTime) + 1;
                        if (time == heroAttackTime) return true;
                        time += Math.min(heroAttackTime - time, diff);

                        if (i == cadrNumber) return false;
                        i = cadrNumber;
                        let direction =
                            this._enemiesOption.getSameEnemy(this._hero.x, this._hero.y).x - 1 ==
                            this._hero.x
                                ? 'right'
                                : 'left';
                        let x = this._hero.x * this._size,
                            y = this._hero.y * this._size;
                        this._artist.clear(x, y);
                        this._artist.drawImage(x, y, 'attack-' + direction + '-' + i);
                    },
                    () => {
                        animateEnd = true;
                        this._enemiesOption.takeDamage(this._hero);
                    },
                );
            },
            this._size,
        );
        this._artist.drawImage(x * this._size, y * this._size, 'main');
    }
}
