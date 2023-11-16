
import { get, writable } from "svelte/store";

const splashText = writable(undefined);
export { splashText }

// ---------------------

const messengerEnabled = writable(true);
export { messengerEnabled }

// ---------------------

const fullscreenGallery = writable({
    gallery: undefined, citation: undefined,
    componentUrl: undefined, componentData: undefined,
    currentImage: 0, galleryDesc: undefined });

const galleryChange = (item, citation,id = 0) => {
    if (item) {
        document.body.classList.add("noScroll");
        messengerEnabled.set(false);
        fullscreenGallery.update(e =>({
            ...e,
            gallery: item.flat(),
            citation: citation.flat(),
            currentImage: id}));}
    else {
        document.body.classList.remove("noScroll");
        messengerEnabled.set(true);
        fullscreenGallery.update(e =>({
            ...e,
            gallery: undefined,
            citation: undefined,
            currentImage: 0 }));}};

export { fullscreenGallery, galleryChange }

const dataSetStore = writable({page: 0, searchQuery: ""});

export { dataSetStore }