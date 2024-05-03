
import { writable } from "svelte/store";

const splashTextData = writable(undefined);
export { splashTextData }

// ---------------------

const messengerSettings = writable(true);
export { messengerSettings }

// ---------------------

const
    fullscreenGalleryStore = writable({
        gallery: undefined,
        componentUrl: undefined, componentData: undefined,
        currentImage: 0, galleryDesc: undefined }),

    galleryChange = (item, id = 0) => {
        if (item) {
            fullscreenGalleryStore.update(e =>({
                ...e,
                gallery: item.flat(),
                currentImage: id}));}
        else {
            fullscreenGalleryStore.update(e =>({
                ...e,
                gallery: undefined,
                componentData: undefined,
                componentUrl: undefined,
                currentImage: 0 }));}},

    dataSetStore = writable({page: 0, searchQuery: ""});

export { fullscreenGalleryStore, galleryChange, dataSetStore }