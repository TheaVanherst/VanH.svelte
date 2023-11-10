
import {navigationVisibility, socialMediaVisibility} from "$lib/controllers/pageControllers.js";

export function load () {
    socialMediaVisibility.set(true);
    navigationVisibility.set(true);
}