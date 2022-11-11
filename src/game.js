import { DrawOptions } from './drawOptions';
import { Hero } from './heroOptions/hero';
import { setHeroEventListeners } from './heroOptions/heroListeners';
import { MoveOption } from './heroOptions/moveOption';

// Класс Логики Игры
export class Game {
    constructor(blockSize, idName, images) {
        this._size = blockSize;
        this._idName = idName;
        this._artist = new DrawOptions(blockSize, idName, images);
    }

    //Добавление главного игрока
    setMainHero(x, y) {
        this._hero = new Hero(1000, 10, x, y);
        setHeroEventListeners(this._idName, this._hero, (x1, y1, x2, y2, f) => {
            MoveOption(
                this._artist,
                x1 * this._size,
                x2 * this._size,
                y1 * this._size,
                y2 * this._size,
                f,
            );
        });
        this._artist.drawImage(x * this._size, y * this._size, 'main');
    }
}
