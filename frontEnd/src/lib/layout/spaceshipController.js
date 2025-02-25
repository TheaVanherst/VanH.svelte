
import { readable } from "svelte/store";

export default readable({ x: 0, y: 0, xTilt: 0, yTilt: 0 }, (set) => {
    const
        framesPerSecond =  1000 / 15,
        xRequired1 =       2, xRequired2 = 6, yRequired = 6,
        width =            48, height = 49,
        offsetCalcX =   [0, width, width * 2, width * 3, width * 4],
        offsetCalcY =   [0, height, height * 2];

    let oldX = 0,
        oldY = 0,
        lastUpdate = 0,
        animationFrame;

    const calculateTilt = (x, y) => {
        const
            diffX = Math.abs(x - oldX),
            diffY = Math.abs(y - oldY);

        // Determine tilt for X and Y based on movement thresholds
        const
            xTilt = diffX < xRequired1 ? 2 : (x > oldX ? (diffX > xRequired2 ? 4 : 3) : (diffX > xRequired2 ? 0 : 1)),
            yTilt = diffY < yRequired ? 1 : (y > oldY ? 0 : 2);

        return { xTilt, yTilt };
    };

    const updateDirection  = (x, y) => {
        const { xTilt, yTilt } = calculateTilt(x, y);
        set({
            x,
            y,
            xTilt:  offsetCalcX[xTilt],
            yTilt:  offsetCalcY[yTilt],
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
            updateDirection (e.clientX, e.clientY);

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

    const handlePointerMove = (e) => {
        requestAnimationFrame(() => move(e));
    };

    document.addEventListener("pointermove", handlePointerMove);

    return () => {
        document.removeEventListener("pointermove", handlePointerMove);
        clearTimeout(animationFrame);
    };
});