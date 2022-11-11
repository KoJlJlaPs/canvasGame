// import { Main } from './main';
// window.onload = () => {
//     const images = document.querySelectorAll('img');
//     const main = new Main(100, images);
//     main.setMainCharacter(4, 5);
// };

import { Game } from './game';

window.onload = () => {
    const images = {};
    document.querySelectorAll('img').forEach((image) => {
        images[image.id] = image;
    });
    const game = new Game(100, 'game-field', images);
    game.setMainHero(4, 5);
};
