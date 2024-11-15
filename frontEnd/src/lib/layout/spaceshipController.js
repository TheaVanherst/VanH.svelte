
import { readable } from "svelte/store";

export default readable({ x: 0, y: 0, xTilt: 0, yTilt: 0 }, (set) => {
    const framesPerSecond = 1000 / 15;
    const xRequired1 = 2, xRequired2 = 6, yRequired = 6;
    const width = 48, height = 49;
    const offsetCalcX = [0, width, width * 2, width * 3, width * 4];
    const offsetCalcY = [0, height, height * 2];
    let oldX = 0, oldY = 0, lastUpdate = 0, animationFrame;

    const calculateTilt = (x, y) => {
        const diffX = Math.abs(x - oldX);
        const diffY = Math.abs(y - oldY);

        const xTilt =
            diffX < xRequired1 ? 2 :
                x > oldX ? (diffX > xRequired2 ? 4 : 3) :
                    (diffX > xRequired2 ? 0 : 1);

        const yTilt = diffY < yRequired ? 1 : (y > oldY ? 0 : 2);

        return { xTilt, yTilt };
    };

    const directionCalc = (x, y) => {
        const { xTilt, yTilt } = calculateTilt(x, y);
        set({
            x,
            y,
            xTilt: offsetCalcX[xTilt],
            yTilt: offsetCalcY[yTilt],
            xMulti: xTilt,
            yMulti: yTilt
        });

        oldX = x;
        oldY = y;
    };

    const move = (e) => {
        const now = Date.now();
        if (now - lastUpdate >= framesPerSecond) {
            lastUpdate = now;
            directionCalc(e.clientX, e.clientY);

            // Reset tilt back to neutral after 250ms
            clearTimeout(animationFrame);
            animationFrame = setTimeout(() => {
                set({
                    xTilt: offsetCalcX[2],
                    yTilt: offsetCalcY[1],
                    xMulti: 2,
                    yMulti: 1
                });
            }, 250);
        }
    };

    document.addEventListener("pointermove", move);

    return () => {
        document.removeEventListener("pointermove", move);
        clearTimeout(animationFrame);
    };
});