
import { navigationData } from "$lib/controllers/layoutControllers/navigationHandling.js";

export function load () {
    navigationData.set({ logo: true, navigation: true, socials: true, search: false });
}