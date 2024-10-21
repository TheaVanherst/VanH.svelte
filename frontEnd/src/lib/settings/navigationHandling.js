
import { get, writable } from "svelte/store";

// ---------------------

const
    redirector = " 𝚊𝚝",
    navigationDirectories = [
        {   title: "",              imagePath: "exitIcon",          path: "/",              nsfw:false,     pagePreview: "𝐇𝐨𝐦𝐞" + redirector,   class:'inv'},
        {   title: "Home",          imagePath: "houseIcon",         path: "/featured",      nsfw:false,     pagePreview: "𝐇𝐨𝐦𝐞" + redirector},
        {   title: "Creations",     imagePath: "artworksIcon",      pages: [
            {   title: "Art",       imagePath: "galleryIcon",       path: "/artwork",       nsfw:false,     pagePreview: "𝕬𝖗𝖙𝖜𝖔𝖗𝖐" + redirector,
                    characters: true, queryTypes: ["explicit","genre","generic","nsfw"]},
            {   title: "Design",    imagePath: "colourWheelIcon",   path: "/design",        nsfw:false,     pagePreview: "𝔇𝔢𝔰𝔦𝔤𝔫" + redirector,
                    characters: true, queryTypes: ["design","genre","generic"]},
            {   title: "Mods",      imagePath: "workshopIcon",      path: "/workshop",      nsfw:false,     pagePreview: "𝔇𝔢𝔰𝔦𝔤𝔫" + redirector,
                    characters: true, queryTypes: []}
        ]},
        {   title: "Universe",      imagePath: "universeIcon",      pages: [
            {   title: "Erotica",   imagePath: "bookIcon",          path: "/erotica",       nsfw:true,      pagePreview: "𝓔𝓻𝓸𝓽𝓲𝓬𝓪" + redirector,
                    characters: true, queryTypes: ["explicit","nsfw"]},
            // {   title: "Lore",      imagePath: "charactersIcon",    path: "/personas",   nsfw:false,   pagePreview: "𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿𝘀" + redirector},
        ]},
        {   title: "Portfolio",     imagePath: "profileIcon",   pages: [
            {   title: "Slots",     imagePath: "tagIcon",           path: "/commissions",   nsfw:false,     pagePreview: "𝕊𝕝𝕠𝕥𝕤" + redirector},
            // {   title: "Members",   imagePath: "kofiLogo",       path: "/members",       nsfw:true,      pagePreview: "𝓜𝓮𝓶𝓫𝓮𝓻𝓼" + redirector},
            {   title: "Artists",   imagePath: "charactersIcon",    path: "/authors",       nsfw:false,     pagePreview: "𝐀𝐮𝐭𝐡𝐨𝐫𝐬" + redirector},
            {   title: "Carrd",     imagePath: "profileIcon",       path: "/carrd",         nsfw:false,     pagePreview: "𝗦𝗼𝗰𝗶𝗮𝗹𝘀" + redirector}]}
    ];

export { navigationDirectories };

// ---------------------

const
    directoryStatus =
        writable({
            rawDirectory: "/", strippedUrl: '/', currentRoot: '/',
            rootIndex: [0,undefined],
            query: '', nsfwKeyword: 'afterdark',
            nsfwUrlCheck: () => get(navigationControls).nsfw ? "/" + get(directoryStatus).nsfwKeyword : ""}),
    navigationControls =
        writable({
            direction: [0,0], nsfw: false,
            loaded: false, transitioning: true,
            localNsfwCheck: (e) => !e && !get(navigationControls).nsfw || get(navigationControls).nsfw }),
    deviceData =
        writable({
            scrollPos: 0,
            screenSize: 0, screenType: 0, deviceType: 0, bandWidths: [850, 625, 500]}),
    navigationData =
        writable({
            logo: true,
            navigation: false, socials: false,
            search: false, filtering: false});

export { directoryStatus, navigationControls, deviceData, navigationData };

// ---------------------

const
    directoryProcessing = async (previousRaw, currentRaw) => {
        const
            slicer = i => i.slice(-1) === "/" ? i.slice(0, -1) : i,
            indexCheck = i => navigationDirectories.findIndex(e => e.pages ? e.pages.map(a => a.path).includes("/" + i) : e.path === "/" + i);

        previousRaw = slicer(previousRaw);
        currentRaw = slicer(currentRaw);

        const
            previousPageArray = previousRaw.split("/"),
            currentPageArray = currentRaw.split("/") ?? [''],
            nsfwCheckBool = get(navigationControls).nsfw ? 2 : 1,
            strippedRawQuery = (currentRaw).split("?"), //removes queryPresets from the search
            prevPageIndex = indexCheck(currentPageArray[nsfwCheckBool]),
            currPageIndex = indexCheck(previousPageArray[nsfwCheckBool]);
        const
            strippedUrlCheck = get(navigationControls).nsfw ? strippedRawQuery[0].replaceAll(`/${get(directoryStatus).nsfwKeyword}`,'') : strippedRawQuery[0],
            pageId = navigationDirectories[prevPageIndex]?.pages?.findIndex(e => e.path === "/" + currentPageArray[nsfwCheckBool]) ?? undefined

        let directionOffset = [];

        if (currentPageArray.length ^ previousPageArray.length && prevPageIndex ^ currPageIndex) {
            // initial page load
            directionOffset =   [0,0]}
        else if (currentPageArray.length === previousPageArray.length && prevPageIndex === currPageIndex) {
            // transitioning in vertical direction
            const pagesIdPos = e => navigationDirectories[prevPageIndex]?.pages?.findIndex(i => e === i.path ? i.path : null) ?? 0;
            directionOffset =   [0, pagesIdPos(previousRaw.replace('/afterdark','')) > pagesIdPos(currentRaw.replace('/afterdark','')) ? 1 : -1 ?? 0];}
        else {
            // transitioning in horizontal direction
            directionOffset =   [prevPageIndex > currPageIndex ? 1 : -1 ?? 0, 0]}
                // ensures everything is synced on random page redirect

        navigationControls.update(e => ({ ...e,
            direction: directionOffset}));
        directoryStatus.update(e => ({ ...e,
            rawDirectory:   currentRaw,
            currentRoot:    "/" + (currentPageArray[nsfwCheckBool] ?? ""),
            nsfwOptional:   get(navigationControls).nsfw ? "/" + get(directoryStatus).nsfwKeyword : '',
            query:          strippedRawQuery[1] ? "?" + strippedRawQuery[1] : "",
            strippedUrl:    strippedUrlCheck,
            rootIndex:      [prevPageIndex, pageId]}));
    };

export { directoryProcessing };
