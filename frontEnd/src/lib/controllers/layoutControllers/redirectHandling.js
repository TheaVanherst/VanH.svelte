
import { get, writable } from "svelte/store";

const
    directoryData =         writable({ raw: "/", stripped: '/', root: '/' }),
    navigationControls =    writable({ direction: [0,0], nsfw: false, loaded: false, transitioning: true }),
    deviceData =            writable({ scrollPos: 0, screenSize: 0, screenType: 0, deviceType: 0, bandWidths: [850, 600, 500]}),
    navigationData =        writable({ logo: true, navigation: false, socials: false, search: false});

export { directoryData, navigationControls, deviceData, navigationData };

// ---------------------

import { navigationDirectories } from "$lib/controllers/layoutControllers/navigationDirectories.js";

const
    directionProcessing = async (p,c,b = null, f = 0) => {
        let directionOffset = 0,
            previousPage = p.split("/"),
            currentPage = c.split("/");

        let nsfwState = get(navigationControls).nsfw,
            nsfwCheck = nsfwState ? 2 : 1;

        let pyo = navigationDirectories.findIndex(e => e.path === "/" + currentPage[1 + f]),
            cyo = navigationDirectories.findIndex(e => e.path === "/" + previousPage[1 + f]),
            rrd = ((!b ? b : c ?? "") + "/"),
            qsd = rrd.split("?");

        if (pyo ^ cyo || previousPage[nsfwCheck] !== currentPage[nsfwCheck]) { // only moves if x isn't
            directionOffset = pyo > cyo ? 1 : -1;} // upwards / downwards

        navigationControls.update(e => ({...e, direction: [directionOffset]}));
        directoryData.set({ raw: rrd, root: "/" + currentPage[nsfwCheck], query: qsd[1],
            stripped: (get(navigationControls).nsfw ? qsd[0].replaceAll("/nsfw",'') : qsd[0])});
    };

export { directionProcessing };


// TODO: USERINTERFACE CONTROLLERS