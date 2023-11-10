
import { socialMediaVisibility, navigationVisibility } from "$lib/controllers/pageControllers.js";

export async function load () {
    socialMediaVisibility.set(true);
    navigationVisibility.set(true);
}