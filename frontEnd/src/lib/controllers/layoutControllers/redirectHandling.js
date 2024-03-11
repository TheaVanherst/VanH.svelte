
import { get, writable } from "svelte/store";

// ---------------------

const redirector = " 𝚊𝚝";
const navigationDirectories =
    [
        {   title: "Home",      imagePath: "houseIcon",         path: "/featured",        nsfw:false,   pagePreview: "𝐇𝐨𝐦𝐞" + redirector},
        {   title: "Artwork",   imagePath: "artworksIcon",      pages: [
            {   title: "Art",           imagePath: "galleryIcon",       path: "/artwork",     nsfw:false,   pagePreview: "𝕬𝖗𝖙𝖜𝖔𝖗𝖐" + redirector},
            {   title: "Design",        imagePath: "colourWheel",       path: "/design",      nsfw:false,   pagePreview: "𝔇𝔢𝔰𝔦𝔤𝔫" + redirector}
        ]},
        {   title: "Alternate", imagePath: "commissionedIcon",  pages: [
            {   title: "Erotica",       imagePath: "bookIcon",          path: "/erotica",     nsfw:true,    pagePreview: "𝓔𝓻𝓸𝓽𝓲𝓬𝓪" + redirector},
            // {   title: "Personas",      imagePath: "charactersIcon",    path: "/personas",    nsfw:false,   pagePreview: "𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿𝘀" + redirector}
        ]},
        // {   title: "Characters",imagePath: "homeIcon",   path: "/artwork",     nsfw:false,   pagePreview: "𝕬𝖗𝖙𝖜𝖔𝖗𝖐" + redirector},
        {   title: "Slots",     imagePath: "tagIcon",           path: "/commissions", nsfw:false,   pagePreview: "𝕊𝕝𝕠𝕥𝕤" + redirector},
        {   title: "Carrd",     imagePath: "profileIcon",       path: "/carrd",       nsfw:false,   pagePreview: "𝗦𝗼𝗰𝗶𝗮𝗹𝘀" + redirector},
    ];

export { navigationDirectories };

// ---------------------

const
    directoryData =         writable({ raw: "/", stripped: '/', root: '/', query: '', nsfwKeyword: 'afterdark', nsfwUrlCheck: () => get(navigationControls).nsfw ? "/" + get(directoryData).nsfwKeyword : ""}),
    navigationControls =    writable({ direction: [0,0], nsfw: false, loaded: false, transitioning: true, localNsfwCheck: (e) => !e && !get(navigationControls).nsfw || get(navigationControls).nsfw }),
    deviceData =            writable({ scrollPos: 0, screenSize: 0, screenType: 0, deviceType: 0, bandWidths: [850, 600, 500]}),
    navigationData =        writable({ logo: true, navigation: false, socials: false, search: false, filtering: false});

export { directoryData, navigationControls, deviceData, navigationData };

// ---------------------

const
    directoryProcessing = async (p, c) => {
        p = p.slice(-1) === "/" ? p.slice(0, -1) : p;
        c = c.slice(-1) === "/" ? c.slice(0, -1) : c;

        let directionOffset = [0,0],
            // strips the current url redirects
            previousPage = p.split("/"),
            currentPage = c.split("/"),
            nsfwCheck = get(navigationControls).nsfw ? 2 : 1; //gets the nsfw state

            //checks relative directory via the directories
        let pyo = navigationDirectories.findIndex(e => e.pages ? e.pages.map(i => i.path).includes("/" + currentPage[nsfwCheck]) : e.path === "/" + currentPage[nsfwCheck]),
            cyo = navigationDirectories.findIndex(e => e.pages ? e.pages.map(i => i.path).includes("/" + previousPage[nsfwCheck]) : e.path === "/" + previousPage[nsfwCheck]),
            rrd = c + "/", //corrects the page url to the front-end one, which requires a "/"
            qsd = rrd.split("?"); //removes queryPresets from the search

        if (currentPage.length ^ previousPage.length && pyo ^ cyo) { // initial page load
            directionOffset = [0,0]; // deals with larger transitions.
        } else if (currentPage.length === previousPage.length && pyo === cyo) { // for pages transitioning in both directions
            directionOffset = [0,0]; // deals with larger transitions.
        } else { // literally everything else
            directionOffset[1] = currentPage.length ^ previousPage.length ? currentPage.length > previousPage.length ? 1 : -1 : 0;
            directionOffset[0] = directionOffset[1] === 0 ? pyo > cyo ? 1 : -1 : 0;}

        navigationControls.update(e => ({...e, direction: directionOffset})); //forwards the page direction to the store
        directoryData.update(e => ({...e, raw: rrd, root: "/" + currentPage[nsfwCheck], query: qsd[1],
            stripped: (get(navigationControls).nsfw ? qsd[0].replaceAll(`/${get(directoryData).nsfwKeyword}`,'') : qsd[0])}));
    };

export { directoryProcessing };
