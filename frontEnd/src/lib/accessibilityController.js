
import { writable } from "svelte/store";

const
    scrollPos = writable(0),
    screenSize = writable(0),
    screenType = writable(0);

const bandWidths = [850, 600, 400]; //pre-determined bandwidth sizes

export { scrollPos, screenSize, bandWidths, screenType };

