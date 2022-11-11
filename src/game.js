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
        setHeroEventListeners(this._idName, this._hero, (x1, y1, x2, y2) => {
            MoveOption(this._artist, x1, x2, y1, y2);
        });
        this._artist.drawImage(x, y, 'main');
    }
}
