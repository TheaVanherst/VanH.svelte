
import { readable } from 'svelte/store';

let oldX =  0, oldY =  0;
let diffX = 0, diffY = 0;
let xTilt = 0, yTilt = 0;

let timeout, waitUntil = 0;
const
    framesPerSecond = 1000 / 15;

const
    xRequired1 = 2,
    xRequired2 = 6,
    yRequired = 6;

const // spaceship spritesheet dimentions
    width = 48, height = 49,
    offsetCalcX = [0, width, width * 2, width * 3, width * 4],
    offsetCalcY = [0, height, height * 2];

export default readable({x:0, y:0, xTilt: 0}, (set) => {
    const
        directionCalc = (x, y) => {
            waitUntil = Date.now() + framesPerSecond;
            diffX = Math.abs(x - oldX);
            diffY = Math.abs(y - oldY);

            xTilt = diffX < xRequired1 ? 2 : x > oldX ? diffX > xRequired2 ? 4 : 3 : diffX > xRequired2 ? 0 : 1;
            yTilt = diffY < yRequired ?  1 : y > oldY ? 0 : 2;

            set({
                x:  x, y:  y,
                xTilt: offsetCalcX[xTilt], yTilt: offsetCalcY[yTilt],
                xMulti: xTilt, yMulti: yTilt
            });

            oldX = x;
            oldY = y;

            clearTimeout(timeout);

            timeout = setTimeout(() => {
                if (xTilt !== 2) {
                    xTilt < 2 ? xTilt++ : xTilt--;}

                set({
                    xTilt: offsetCalcX[xTilt], yTilt: offsetCalcY[1],
                    xMulti: xTilt, yMulti: 1
                });

                if (xTilt !== 2) {
                    setTimeout(() => {
                        set({
                            xTilt: offsetCalcX[2], yTilt: offsetCalcY[1],
                            xMulti: 2, yMulti: 1
                        });
                    }, 100);
                }
            }, 250);
        },

        move = (e) => {
            if (Date.now() >= waitUntil) {
                directionCalc(e.clientX, e.clientY)}}

    document.addEventListener("pointermove", move);

    return () => {
        document.removeEventListener("mousemove", move);}
})