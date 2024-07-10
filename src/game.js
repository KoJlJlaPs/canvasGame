import { DrawOptions } from './drawOptions';
import { Enemies as EnemiesOption } from './enemy/enemiesOption';
import { drawAnimate } from './heroOptions/animateOption';
import { Hero } from './heroOptions/hero';
import { setHeroEventListeners } from './heroOptions/heroListeners';
import { MoveOption } from './heroOptions/moveOption';
import { CANVAS_ELEMENT_ID, BLOCK_SIZE } from './config';

// Класс Логики Игры
export class Game {
    constructor(blockSize, canvasElement, images) {
        this._size = blockSize;
        this._canvasElement = canvasElement;
        this._artist = new DrawOptions(blockSize, canvasElement, images);
        // Добавление врагов
        this._enemiesOption = new EnemiesOption((x, y, color) =>
            this._artist.draw(x * this._size, y * this._size, color),
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
                this._heroAttackAnimate(position);
                this._animateEnd = false;
            },
            this._size,
            this._artist,
        );
        // Прорисовывание первого кадра персонажа
        this._artist.drawImage(x * this._size, y * this._size, 'main');
    }

    // Анимация атаки главного героя
    _heroAttackAnimate(clickPosition) {
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

                // Поиск рядом врага
                let sameEnemy = this._enemiesOption.getSameEnemy(this._hero.x, this._hero.y);
                if (!sameEnemy) return;
                // Проверка места клика мыши
                if (clickPosition) {
                    // Позиция врага по координатам
                    const EP = {
                        startX: sameEnemy.x * this._size,
                        startY: sameEnemy.y * this._size,
                        endX: (sameEnemy.x + 1) * this._size,
                        endY: (sameEnemy.y + 1) * this._size,
                    };
                    // Проверка нажатия на врага мышкой
                    if (
                        !(
                            clickPosition.x > EP.startX &&
                            clickPosition.x < EP.endX &&
                            clickPosition.y > EP.startY &&
                            clickPosition.y < EP.endY
                        )
                    )
                        return;
                }
                // Получение направления атаки
                let direction = sameEnemy.x - 1 == this._hero.x ? 'right' : 'left';
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
