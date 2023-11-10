
// TODO: page checking and controlling

import { get, writable } from "svelte/store";

const
    scrollPos = writable(0),
    screenSize = writable(0),
    screenType = writable(0),
    bandWidths = [850, 600, 500]; //pre-determined bandwidth sizes

export { scrollPos, screenSize, bandWidths, screenType };

// TODO: Internal device management & specific code application instances.

const deviceType = writable(undefined);

export { deviceType };

// TODO: Internal directory and status management

const
    directory =     writable({raw: "/", stripped: '/', root: '/'});
const
    pageLoaded =    writable(false), // ensures that the layout is loaded
    transitioning = writable(true); // detects page changes

export { directory, pageLoaded, transitioning };

import { navigationDirectories } from "$lib/pageSettings/navigationDirectories.js";

// TODO: navigation direction controller

const
    urlStoreArr =   writable([""]), // handles the transition direction
    direction =    writable([0,0]); // handles the transition direction

export { urlStoreArr, direction }

const
    nsfw = writable(false);

export { nsfw }

const
    directionProcessing = async (p,c,b = null, f = 0) => {
        let offsets = 0;
        let pfr = p.split("/"), cfr = c.split("/");

        let pyo = navigationDirectories.findIndex(e => e.path === "/" + cfr[1 + f]),
            cyo = navigationDirectories.findIndex(e => e.path === "/" + pfr[1 + f]);

        let nsfwCheck = get(nsfw) ? 2 : 1;
        if (pyo ^ cyo || pfr[nsfwCheck] !== cfr[nsfwCheck]) { // only moves if x isn't
            offsets = pyo > cyo ? 1 : -1;} // upwards / downwards

        direction.set([offsets]);

        let dp = (!b ? b : c ?? "") + "/";
        directory.set({ raw: dp, stripped: (get(nsfw) ? dp.replaceAll("/nsfw",'') : dp), root: "/" + cfr[nsfwCheck] });
    };

export { directionProcessing };

// TODO: USERINTERFACE CONTROLLERS

const navigationSettings = writable({logo: true, navigation: false, socials: false, search: false});

export {  navigationSettings };