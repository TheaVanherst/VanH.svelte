
import { get, writable } from "svelte/store";

// ---------------------

const
    redirector = " 𝚊𝚝",
    navigationDirectories = [
        {   title: "",              imagePath: "exitIcon",          path: "/",              nsfw:false,     pagePreview: "𝐇𝐨𝐦𝐞" + redirector,   class:'inv'},
        {   title: "Home",          imagePath: "houseIcon",         path: "/featured",      nsfw:false,     pagePreview: "𝐇𝐨𝐦𝐞" + redirector},
        {   title: "Creations",     imagePath: "artworksIcon",      pages: [
            {   title: "Art",       imagePath: "galleryIcon",       path: "/artwork",       nsfw:false,     pagePreview: "𝕬𝖗𝖙𝖜𝖔𝖗𝖐" + redirector,
                    characters: true, queryTypes: ["explicitTags","genreTag","genericTags","nsfwTags","characterTags"]},
            {   title: "Design",    imagePath: "colourWheelIcon",   path: "/design",        nsfw:false,     pagePreview: "𝔇𝔢𝔰𝔦𝔤𝔫" + redirector,
                    characters: true, queryTypes: ["designTags","genreTag","genericTags","characterTags"]},
            {   title: "Mods",      imagePath: "workshopIcon",      path: "/workshop",      nsfw:false,     pagePreview: "𝔇𝔢𝔰𝔦𝔤𝔫" + redirector,
                    characters: true, queryTypes: ["designTags","genreTag"]}
        ]},
        {   title: "Universe",      imagePath: "universeIcon",      pages: [
            {   title: "Erotica",   imagePath: "bookIcon",          path: "/erotica",       nsfw:true,      pagePreview: "𝓔𝓻𝓸𝓽𝓲𝓬𝓪" + redirector,
                    characters: true, queryTypes: ["explicitTags","nsfwTags","characterTags"]},
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
            rootIndex: [0,0],
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
    slicer = (path) => path.endsWith("/") ? path.slice(0, -1) : path,
    indexCheck = (segment) =>
        navigationDirectories.findIndex(dir =>
            dir.pages
                ? dir.pages.some(page => page.path === `/${segment}`)
                : dir.path === `/${segment}`
        ),
    findPageIndex = (path) =>
        navigationDirectories[path]?.pages?.findIndex((page) =>
            page.path === path ? path : undefined
        ) ?? 0;

const
    directoryProcessing = async (previousRaw, currentRaw) => {
        const nsfwCheckBool = +get(navigationControls).nsfw + 1;

        // Preprocess URLs
        previousRaw = slicer(previousRaw);
        currentRaw = slicer(currentRaw);
        const
            previousPageArray = previousRaw.split("/"),
            currentPageArray = currentRaw.split("/") ?? [""],
            strippedRawQuery = currentRaw.split("?"),
            strippedUrlCheck = get(navigationControls).nsfw
                ? strippedRawQuery[0].replaceAll(`/${get(directoryStatus).nsfwKeyword}`, "")
                : strippedRawQuery[0],
            prevPageIndex = indexCheck(currentPageArray[nsfwCheckBool]),
            currPageIndex = indexCheck(previousPageArray[nsfwCheckBool]);
        const
            pageId = navigationDirectories[prevPageIndex]?.pages?.findIndex(e => e.path === "/" + currentPageArray[nsfwCheckBool]) ?? 0

        // Determine direction
        let directionOffset = [0, 0];
        if (currentPageArray.length !== previousPageArray.length || prevPageIndex !== currPageIndex) {
            // Horizontal transition
            directionOffset = [prevPageIndex > currPageIndex ? 1 : -1, 0];
        } else if (currentPageArray.length === previousPageArray.length && prevPageIndex === currPageIndex) {
            // Vertical transition
            directionOffset = [
                0,
                findPageIndex(previousRaw.replace("/afterdark", "")) >
                findPageIndex(currentRaw.replace("/afterdark", ""))
                    ? 1
                    : -1,
            ];
        }

        navigationControls.update((state) => ({
            ...state,
            direction: directionOffset,
        }));

        directoryStatus.update((state) => ({
            ...state,
            rawDirectory: currentRaw,
            currentRoot: `/${currentPageArray[nsfwCheckBool] || ""}`,
            nsfwOptional: get(navigationControls).nsfw
                ? `/${get(directoryStatus).nsfwKeyword}`
                : "",
            query: strippedRawQuery[1] ? `?${strippedRawQuery[1]}` : "",
            strippedUrl: strippedUrlCheck,
            rootIndex: [prevPageIndex, pageId],
        }));
    };

export { directoryProcessing };
