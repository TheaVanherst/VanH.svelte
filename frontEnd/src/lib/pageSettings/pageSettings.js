
import { get, writable } from "svelte/store";

const splashText = writable(undefined);
export { splashText }

// ---------------------

const messengerEnabled = writable(true);
export { messengerEnabled }

// ---------------------

const fullscreenGallery = writable({currentImage: 0, gallery: undefined});

const galleryChange = (item,id = 0) => {
    if (item) {
        document.body.classList.add("noScroll");
        messengerEnabled.set(false);
        fullscreenGallery.set({gallery: item.flat(), currentImage: id});}
    else {
        document.body.classList.remove("noScroll");
        messengerEnabled.set(true);
        fullscreenGallery.set({gallery: undefined, currentImage: 0});}
};

export { fullscreenGallery, galleryChange }

const dataSetStore = writable({page: 0, searchQuery: ""});

export { dataSetStore }