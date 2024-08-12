/*
Система 'RGB' - R - revocation -  (в переводе отмена, аннулирование) это место куда нам нельзя 
                G - ground - это место на карте где мы можем находится и двигаться
                B - beast - это враги или же звери, мы можем на них нападать и не можем стоять на их позиции
*/
import place from './place';
import config from '../config';
const { PLACE_TYPES } = config;
const { addPlace } = place;
// ИНИЦИАЛИЗАЦИЯ ПЕРВОСТЕПЕННЫХ МЕСТ
// Места где возможно ходить
const g = addPlace(PLACE_TYPES[1], 'ground', { color: 0x5da130 });
const c = addPlace(PLACE_TYPES[1], 'wheat', { color: 0xffd700 });
// Места где невозможно ходить
const w = addPlace(PLACE_TYPES[0], 'wall', { color: 0xa2653e });
const a = addPlace(PLACE_TYPES[0], 'aqua', { color: 0x4682b4 });
// Враги
const s = addPlace(PLACE_TYPES[2], 'small', { hp: 100, damage: 10, time: 5 });
const m = addPlace(PLACE_TYPES[2], 'medium', { hp: 200, damage: 20, time: 10 });
const map = [
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [w, w, w, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, c, c, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [s, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [m, g, g, g, g, a, a, a, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, w, w, g, w, w, w, g, w, w, g, g, g, g, g, g],
    [g, w, g, g, w, g, w, g, w, g, g, g, g, g, g, g],
    [g, w, w, g, w, w, w, g, w, w, g, g, g, g, g, g],
];
export { map, g };
