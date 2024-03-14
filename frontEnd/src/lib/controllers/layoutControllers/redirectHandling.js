
import { get, writable } from "svelte/store";

// ---------------------

const redirector = " 𝚊𝚝";
const navigationDirectories = [
        {   title: "Featured",      imagePath: "houseIcon",         path: "/featured",    nsfw:false,   pagePreview: "𝐇𝐨𝐦𝐞" + redirector},
        {   title: "Artwork",       imagePath: "artworksIcon",      pages: [
            {   title: "Art",       imagePath: "galleryIcon",       path: "/artwork",     nsfw:false,   pagePreview: "𝕬𝖗𝖙𝖜𝖔𝖗𝖐" + redirector,
                    characters: true, queryTypes: ["explicit","genre","generic","nsfw"]},
            {   title: "Design",    imagePath: "colourWheel",       path: "/design",      nsfw:false,   pagePreview: "𝔇𝔢𝔰𝔦𝔤𝔫" + redirector,
                    characters: true, queryTypes: ["design","genre","generic"]}
        ]},
        {   title: "Alternate",     imagePath: "commissionedIcon",  pages: [
            {   title: "Erotica",   imagePath: "bookIcon",          path: "/erotica",     nsfw:true,    pagePreview: "𝓔𝓻𝓸𝓽𝓲𝓬𝓪" + redirector,
                    characters: true, queryTypes: ["explicit","nsfw"]},
            // {   title: "Lore",      imagePath: "charactersIcon",    path: "/personas",    nsfw:false,   pagePreview: "𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿𝘀" + redirector}
        ]},
        {   title: "Profile",      imagePath: "profileIcon",   pages: [
            {   title: "Artists",   imagePath: "charactersIcon",    path: "/authors",     nsfw:false,   pagePreview: "𝐀𝐮𝐭𝐡𝐨𝐫𝐬" + redirector},
            {   title: "Slots",     imagePath: "tagIcon",           path: "/commissions", nsfw:false,   pagePreview: "𝕊𝕝𝕠𝕥𝕤" + redirector},
            {   title: "Carrd",     imagePath: "shareIcon",         path: "/carrd",       nsfw:false,   pagePreview: "𝗦𝗼𝗰𝗶𝗮𝗹𝘀" + redirector},
            // {   title: "Personas",      imagePath: "charactersIcon",    path: "/personas",    nsfw:false,   pagePreview: "𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿𝘀" + redirector}
        ]}];

export { navigationDirectories };

// ---------------------

const
    directoryData =         writable({ raw: "/", stripped: '/', root: '/', rootInt:[0,undefined], query: '', nsfwKeyword: 'afterdark', nsfwUrlCheck: () => get(navigationControls).nsfw ? "/" + get(directoryData).nsfwKeyword : ""}),
    navigationControls =    writable({ direction: [0,0], nsfw: false, loaded: false, transitioning: true, localNsfwCheck: (e) => !e && !get(navigationControls).nsfw || get(navigationControls).nsfw }),
    deviceData =            writable({ scrollPos: 0, screenSize: 0, screenType: 0, deviceType: 0, bandWidths: [850, 600, 500]}),
    navigationData =        writable({ logo: true, navigation: false, socials: false, search: false, filtering: false});

export { directoryData, navigationControls, deviceData, navigationData };

// ---------------------

const
    directoryProcessing = async (p, c) => {
        p = p.slice(-1) === "/" ? p.slice(0, -1) : p;
        c = c.slice(-1) === "/" ? c.slice(0, -1) : c;
        const
            previousPage = p.split("/"),
            currentPage = c.split("/"),
            nsfwCheck = get(navigationControls).nsfw ? 2 : 1;

        const indexCheck = (p) => {
            return navigationDirectories.findIndex(e => e.pages ? e.pages.map(i => i.path).includes("/" + p) : e.path === "/" + p);}

        const
            queryStripped = (c + "/").split("?"),
                //removes queryPresets from the search
            prevPageId = indexCheck(currentPage[nsfwCheck]),
            currPageId = indexCheck(previousPage[nsfwCheck]);

        const
            pageIndex = navigationDirectories[prevPageId]?.pages?.findIndex(e => e.path === "/" + currentPage[nsfwCheck]) ?? undefined,
            strippedUrl = get(navigationControls).nsfw ? queryStripped[0].replaceAll(`/${get(directoryData).nsfwKeyword}`,'') : queryStripped[0];

        let directionOffset = [0,0];

        if (currentPage.length ^ previousPage.length && prevPageId ^ currPageId) {
            directionOffset = [0,0];
                // initial page load
        } else if (currentPage.length === previousPage.length && prevPageId === currPageId) {
            directionOffset = [0,0];
                // for pages transitioning in both directions
        } else {
            directionOffset[1] = currentPage.length ^ previousPage.length ? currentPage.length > previousPage.length ? 1 : -1 : 0;
            directionOffset[0] = directionOffset[1] === 0 ? prevPageId > currPageId ? 1 : -1 : 0;}
                // literally everything else

        navigationControls.update(e => ({...e,
            direction: directionOffset}));
        directoryData.update(e => ({...e,
            raw: c + "/", root: "/" + currentPage[nsfwCheck],
            query: queryStripped[1], stripped: strippedUrl, rootInt: [prevPageId, pageIndex]}));
    };

export { directoryProcessing };
