
import { writable } from "svelte/store";

// Scroll pos

const scrollPos = writable(0);

const scrollIntoView = ({ target }) => {
    let element = document.querySelector(target.getAttribute('href'));

    if (!element) element = document.body;

    element.scrollIntoView({
        behavior: 'smooth'
    });
}

export { scrollIntoView, scrollPos };

const screenSize = writable(0);
const screenType = writable(0);

const bandWidths = [850, 600, 400];

export { screenSize, bandWidths, screenType };

