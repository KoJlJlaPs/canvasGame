import config from '../config';
/*
как будем шифровать
сначала идет тип мест = у нас 3 типа, можно сделать 4
это будет 2 бита информации
затем идет идентификационный номер места - будет 6 бита от 0 до 63
затем идут свойства
у мест где можно ходить и где ходить нельзя будет цвет
у врагов будет количество xp и урон
это будет 24 бита
всего будет 32 бита
*/
const { PLACE_TYPES } = config;
// Сохраненные локации, где нибудь надо будет сохранить
let places = {};
// Добавление новых мест
const addPlace = (typeName, placeName, props) => {
    const typeIndex = PLACE_TYPES.indexOf(typeName);
    if (typeIndex == -1 || places[placeName]) return;
    let placeData = typeIndex << 30;
    let typeNumber = 0;
    for (const key in places)
        if (Object.hasOwnProperty.call(places, key)) {
            const element = places[key];
            if (element >>> 30 == typeName) typeNumber++;
        }
    placeData |= typeNumber << 24;
    if (typeIndex == 2) {
        const { hp, damage, time } = props;
        placeData |= hp << 16;
        placeData |= time << 8;
        placeData |= damage;
    } else {
        const { color } = props;
        if (!color) return;
        placeData |= color;
    }
    places[placeName] = placeData;
    return placeData;
};
// Проверка на возможность нахождения на данной клетке
const isCanPlace = (hex) => {
    return hex >>> 30 == 1;
};
const isEnemyPlace = (hex) => {
    return hex >>> 30 == 2;
};
// Получение цвета из элемента Place
const getColor = (hex) => {
    if (isEnemyPlace(hex)) {
        const typeNumber = (hex >> 24) & 0x3f;
        const enemyColors = ['#0000DE', '#DCg43C'];
        return enemyColors[typeNumber];
    }
    return '#' + (hex & 0xffffff).toString(16);
};
export default { addPlace, isCanPlace, getColor, isEnemyPlace };
