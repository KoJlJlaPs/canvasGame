import { Character } from './map';

const testMan = new Character(7, 5);
document.addEventListener('keydown', async function (e) {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            await testMan.asyncTop();
            break;
        case 'ArrowDown':
        case 's':
            await testMan.asyncBottom();
            break;
        case 'ArrowRight':
        case 'd':
            await testMan.asyncRight();
            break;
        case 'ArrowLeft':
        case 'a':
            await testMan.asyncLeft();
            break;

        default:
            break;
    }
});

document.addEventListener('mouseup', async function (e) {
    if (e.button != 0 || e.target.id !== 'game-field') return;
    const x = e.offsetX;
    const y = e.offsetY;
    await testMan.go(x, y);
});
