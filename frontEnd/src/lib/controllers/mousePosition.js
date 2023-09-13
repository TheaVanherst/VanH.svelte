
import { readable } from 'svelte/store';

let // previous cursor locations
    oldX =      0,
    oldY =      0;
let // timeouts
    timeout1,
    timeout2,
    waitUntil = 0;

const
    xRequiredMovement1 = 2,
    xRequiredMovement2 = 6,
    yRequiredMovement = 10;
const
    framesPerSecond = 1000 / 15;

const // spaceship spritesheet dimentions
    width =   48,
    height =  49;
const // spritesheet spritesheet multipliers
    presetOffsetCalcX = [
        0, width, width * 2, width * 3, width * 4],
    presetOffsetCalcY = [
        0, height, height * 2];

export default readable({x:0, y:0, xTilt: 0}, (set) => {
    document.addEventListener("pointermove", move);

    const directionCalc = (x, y) => {
            waitUntil = Date.now() + framesPerSecond;
        let diffX = Math.abs(x - oldX),
            diffY = Math.abs(y - oldY),
            xTilt =
                diffY > diffX ?
                    2 :
                    diffX > xRequiredMovement1 ?
                        x > oldX ?
                            diffX > xRequiredMovement2 ? 4 : 3 :
                            diffX > xRequiredMovement2 ? 0 : 1 :
                        2,
            yTilt =
                y > oldY + yRequiredMovement ?
                    0 :
                    y < oldY - yRequiredMovement ?
                        2 : 1;

        set({
            x:  x,
            y:  y,
            xTilt: presetOffsetCalcX[xTilt],
            yTilt: presetOffsetCalcY[yTilt],
            xMulti: xTilt,
            yMulti: yTilt,
        });

        oldX = x;
        oldY = y;

        clearTimeout(timeout1);
        clearTimeout(timeout2);

        timeout1 = setTimeout(() => {
            xTilt = presetOffsetCalcX[xTilt] < presetOffsetCalcX[2] ? 1 : 3

            set({
                xTilt: presetOffsetCalcX[xTilt],
                yTilt: presetOffsetCalcY[1],
                xMulti: xTilt,
                yMulti: 0,
            })}, 250);
        timeout2 = setTimeout(() => {
            set({
                xTilt: presetOffsetCalcX[2],
                yTilt: presetOffsetCalcY[1],
                xMulti: 2,
                yMulti: 0,
            })}, 300);
    }

    function move(e) {
        if (Date.now() >= waitUntil) {
            directionCalc(e.clientX, e.clientY)}}

    return () => {
        document.removeEventListener("mousemove", move);}
})
