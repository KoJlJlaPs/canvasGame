import { DrawOptions } from './drawOptions';
import { EnemiesOptions } from './enemy/enemiesOption';
import { drawAnimate } from './heroOptions/animateOption';
import { Hero } from './heroOptions/hero';
import { setHeroEventListeners } from './heroOptions/heroListeners';
import { MoveOption } from './heroOptions/moveOption';

// Класс Логики Игры
export class Game {
    constructor(blockSize, canvasElement, images) {
        this._size = blockSize;
        this._canvasElement = canvasElement;
        this._artist = new DrawOptions(blockSize, canvasElement, images);
        this.setEnemies();
    }

    // Доабавление врагов в игру
    setEnemies() {
        this._enemiesOption = new EnemiesOptions(
            ((x, y, color) => this._artist.draw(x * this._size, y * this._size, color)).bind(this),
        );
    }

    //Добавление главного игрока
    setMainHero(x, y) {
        this._hero = new Hero(1000, 10, x, y);
        this._animateEnd = true;
        // Уставновление прослушивание клвиш для движения персонажа
        setHeroEventListeners(
            this._hero,
            MoveOption,
            (position = undefined) => {
                if (!this._animateEnd) return;
                // Поиск рядом врага
                let sameEnemy = this._enemiesOption.getSameEnemy(this._hero.x, this._hero.y);
                if (!sameEnemy) return;

                // Проверка места клика мыши
                if (position) {
                    // Позиция врага по координатам
                    const EP = {
                        startX: sameEnemy.x * this._size,
                        startY: sameEnemy.y * this._size,
                        endX: (sameEnemy.x + 1) * this._size,
                        endY: (sameEnemy.y + 1) * this._size,
                    };
                    console.log(position, EP);
                    // Проверка нажатия на врага мышкой
                    if (
                        !(
                            position.x > EP.startX &&
                            position.x < EP.endX &&
                            position.y > EP.startY &&
                            position.y < EP.endY
                        )
                    )
                        return;
                }
                this._heroAttackAnimate(sameEnemy.x - 1 == this._hero.x ? 'right' : 'left');
                this._animateEnd = false;
            },
            this._size,
            this._artist,
        );
        // Прорисовывание первого кадра персонажа
        this._artist.drawImage(x * this._size, y * this._size, 'main');
    }

    // Анимация атаки главного героя
    _heroAttackAnimate(direction) {
        const heroAttackTime = 100;
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
