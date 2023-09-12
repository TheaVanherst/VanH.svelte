
import { readable } from 'svelte/store';

let oldX =      0,
    oldY =      0;
let timeout1,
    timeout2,
    waitUntil = 5;

const width =   48
const presetOffsetCalc = [
    width * 0, width * 1, width * 2, width * 3, width * 4];

export default readable({x:0, y:0, xTilt: 0}, (set) => {
    document.addEventListener("pointermove", move);

    const directionCalc = (x, y, t = false) => {
            waitUntil = Date.now() + 1000 / 15;
        let diffX = Math.abs(x - oldX),
            diffY = Math.abs(y - oldY),
            tilt = diffY > diffX + 1 ?
                presetOffsetCalc[2] : x > oldX ?
                    diffX > 4 ? presetOffsetCalc[4] : presetOffsetCalc[3] :
                    diffX > 4 ? -presetOffsetCalc[0] : presetOffsetCalc[1];

        set({
            x:  x,
            y:  y,
            xTilt:  tilt
        });

        oldX = x;
        oldY = y;

        clearTimeout(timeout1);
        timeout1 = setTimeout(() => {
            set({ xTilt: tilt < presetOffsetCalc[2] ? presetOffsetCalc[1] : presetOffsetCalc[3] })
        }, 250);

        clearTimeout(timeout2);
        timeout2 = setTimeout(() => {
            set({ xTilt: presetOffsetCalc[2]  })
        }, 300);
    }

    function move(e) {
        if (Date.now() >= waitUntil) {
            directionCalc(e.clientX, e.clientY)}}

    return () => {
        document.removeEventListener("mousemove", move);}
})