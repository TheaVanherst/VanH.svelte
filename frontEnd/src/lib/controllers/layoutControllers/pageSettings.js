
import { writable } from "svelte/store";

const splashTextData = writable(undefined);
export { splashTextData }

const messengerSettings = writable(true);
export { messengerSettings }

// gallery management

const
    fullscreenGalleryStore = writable({
        gallery: undefined,
        componentUrl: undefined, componentData: undefined,
        currentImage: 0, galleryDesc: undefined }),

    galleryStore = (renderer, data) => {
        fullscreenGalleryStore.update(e => ({
            ...e,
            componentUrl: renderer,
            componentData: data}));},
    galleryChange = (id = 0) => {
        if (id !== 0) {
            fullscreenGalleryStore.update(e =>({
                ...e,
                currentImage: id}));}
        else {
            fullscreenGalleryStore.update(e =>({
                componentUrl:   undefined,
                componentData:  undefined,
                currentImage:   0 }));}};

export { fullscreenGalleryStore, galleryStore, galleryChange }

// misc

const
    scrollIntoView = async (id) => {
        const el = await document.querySelector(id);
        if (!el) return;
        el.scrollIntoView({
            behavior: 'smooth'
        });},
    dataSetStore = writable({page: 0, searchQuery: ""});

export { scrollIntoView, dataSetStore }