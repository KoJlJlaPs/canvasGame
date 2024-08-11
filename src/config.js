const HEX_CHARACTERS = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
];
export default {
    MAIN_CHARACTER: {
        //  Клавиши перемещения главного героя
        MOVE_KEY: {
            TOP: 'w',
            BOTTOM: 's',
            LEFT: 'a',
            RIGHT: 'd',
        },
        //  Клавиша атаки
        ATTACK: {
            KEY: 'e',
            CLICK: '',
        },
        //  Минимальное время бездействия персонажа
        MIN_TIME_FOR_CONTINUOSLY_MS: 100,
    },
    PLACE_TYPES: ['revoc', 'ground', 'beast'],
    CONVERT_HEX_TO_DEC: (char) => HEX_CHARACTERS.findIndex((hex) => hex == char),
    CONVERT_DEC_TO_HEX: (num) => HEX_CHARACTERS[Math.floor(num / 16)] + HEX_CHARACTERS[num % 16],
};
