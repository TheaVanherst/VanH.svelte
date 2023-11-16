
import { get, writable } from "svelte/store";

const
    directory =     writable({ raw: "/", stripped: '/', root: '/' }),
    navStatus =     writable({ direction: [0,0], nsfw: false, loaded: false, transitioning: true }),
    deviceData =    writable({ scrollPos: 0, screenSize: 0, screenType: 0, deviceType: 0, bandWidths: [850, 600, 500]}),
    navigation =    writable({ logo: true, navigation: false, socials: false, search: false});

export { directory, navStatus, deviceData, navigation };

// ---------------------

import { navigationDirectories } from "$lib/pageSettings/navigationDirectories.js";

const
    directionProcessing = async (p,c,b = null, f = 0) => {
        let directionOffset = 0,
            previousPage = p.split("/"),
            currentPage = c.split("/"),
            directoryProcessor = (!b ? b : c ?? "") + "/",
            nsfwState = get(navStatus).nsfw;

        let pyo = navigationDirectories.findIndex(e => e.path === "/" + currentPage[1 + f]),
            cyo = navigationDirectories.findIndex(e => e.path === "/" + previousPage[1 + f]);

        let nsfwCheck = nsfwState ? 2 : 1;
        if (pyo ^ cyo || previousPage[nsfwCheck] !== currentPage[nsfwCheck]) { // only moves if x isn't
            directionOffset = pyo > cyo ? 1 : -1;} // upwards / downwards


        navStatus.update(e => ({...e, direction: [directionOffset]}));

        directory.set({ raw: directoryProcessor, root: "/" + currentPage[nsfwCheck],
            stripped: (nsfwState ? directoryProcessor.replaceAll("/nsfw",'') : directoryProcessor)});
    };

export { directionProcessing };

// TODO: USERINTERFACE CONTROLLERS