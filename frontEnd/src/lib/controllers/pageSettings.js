
import { get, writable } from "svelte/store";


const splashText = writable(undefined);
export { splashText }

// ---------------------

const messengerEnabled = writable(true);
export {messengerEnabled}

// ---------------------

const fullscreenGallery = writable(undefined);

const galleryChange = (item) => {
    if (item) {
        document.body.classList.add("noScroll");
        messengerEnabled.set(false);
        fullscreenGallery.set(item);}
    else {
        document.body.classList.remove("noScroll");
        messengerEnabled.set(true);
        fullscreenGallery.set(undefined);}
}

export { fullscreenGallery, galleryChange }