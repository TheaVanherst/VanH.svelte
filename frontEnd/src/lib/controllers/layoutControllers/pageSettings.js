
import { writable } from "svelte/store";

const splashTextData = writable(undefined);
export { splashTextData }

const messengerSettings = writable(true);
export { messengerSettings }

const
    fullscreenGalleryStore = writable({
        gallery: undefined,
        componentUrl: undefined, componentData: undefined,
        currentImage: 0, galleryDesc: undefined }),

    galleryChange = (id = 0) => {
        if (id !== 0) {
            fullscreenGalleryStore.update(e =>({
                ...e,
                currentImage: id}));}
        else {
            fullscreenGalleryStore.update(e =>({
                ...e,
                componentData: undefined,
                componentUrl: undefined,
                currentImage: 0 }));}},
    scrollIntoView = async (id) => {
        const el = await document.querySelector(id);

        if (!el) return;
        el.scrollIntoView({
            behavior: 'smooth'
        });},
    dataSetStore = writable({page: 0, searchQuery: ""});

export { fullscreenGalleryStore, galleryChange, scrollIntoView, dataSetStore }