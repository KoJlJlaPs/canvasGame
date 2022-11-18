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
        this._animateEnd = true;
        setHeroEventListeners(
            this._hero,
            MoveOption,
            () => {
                if (!this._animateEnd) return;
                this._animateEnd = false;
                this._heroAttackAnimate();
            },
            this._size,
            this._artist,
        );
        this._artist.drawImage(x * this._size, y * this._size, 'main');
    }

    // Анимация атаки главного героя
    _heroAttackAnimate() {
        const heroAttackTime = 250;
        const cardCount = 6;
        let time = 0;
        let i = 1;
        // Рисование анимации атаки
        drawAnimate(
            (diff) => {
                let cadrNumber = Math.round(((cardCount - 1) * time) / heroAttackTime) + 1;
                if (time == heroAttackTime) return true;
                time += Math.min(heroAttackTime - time, diff);

                if (i == cadrNumber) return false;
                i = cadrNumber;
                // Получение направления атаки
                let direction =
                    this._enemiesOption.getSameEnemy(this._hero.x, this._hero.y).x - 1 ==
                    this._hero.x
                        ? 'right'
                        : 'left';
                let x = this._hero.x * this._size,
                    y = this._hero.y * this._size;
                this._artist.draw(x, y);
                this._artist.drawImage(x, y, 'attack-' + direction + '-' + i);
            },
            () => {
                this._animateEnd = true;
                this._enemiesOption.takeDamage(this._hero);
            },
        );
    }
}
