
import { get, writable } from "svelte/store";

const
    directoryData =         writable({ raw: "/", stripped: '/', root: '/' }),
    navigationControls =    writable({ direction: [0,0], nsfw: false, loaded: false, transitioning: true }),
    deviceData =            writable({ scrollPos: 0, screenSize: 0, screenType: 0, deviceType: 0, bandWidths: [850, 600, 500]}),
    navigationData =        writable({ logo: true, navigation: false, socials: false, search: false, filtering: false});

export { directoryData, navigationControls, deviceData, navigationData };

// ---------------------

import { navigationDirectories } from "$lib/controllers/layoutControllers/navigationDirectories.js";

const
    directionProcessing = async (p,c,b = null, f = 0) => {
        let directionOffset = 0,
            // strips the current url redirects
            previousPage = p.split("/"),
            currentPage = c.split("/");

        let nsfwCheck = get(navigationControls).nsfw ? 2 : 1; //gets the nsfw state
            //checks relative directory via the directories
        let pyo = navigationDirectories.findIndex(e => e.path === "/" + currentPage[1 + f]),
            cyo = navigationDirectories.findIndex(e => e.path === "/" + previousPage[1 + f]),

            //genuinely, I can't remember what this does.
            rrd = b + "/", //corrects the page url to the front-end one, which requires a "/"
            qsd = rrd.split("?"); //removes queries from the search

        if (pyo ^ cyo || previousPage[nsfwCheck] !== currentPage[nsfwCheck]) { // only moves if x isn't
            directionOffset = pyo > cyo ? 1 : -1;} // upwards / downwards

        navigationControls.update(e => ({...e, direction: [directionOffset]})); //forwards the page direction to the store
        directoryData.set({ raw: rrd, root: "/" + currentPage[nsfwCheck], query: qsd[1],
            stripped: (get(navigationControls).nsfw ? qsd[0].replaceAll("/nsfw",'') : qsd[0])});
    };

export { directionProcessing };