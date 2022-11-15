// Функция прорисовки анимации
export function drawAnimate(func, lastFunction = null) {
    let start;
    // Проведение функции при каждой итерации
    const animate = (time) => {
        if (start === undefined) start = time;
        if (func(time - start)) {
            if (lastFunction) lastFunction();
            return;
        }

        start = time;
        window.requestAnimationFrame(animate);
    };

    window.requestAnimationFrame(animate);
}
