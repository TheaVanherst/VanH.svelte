
import { navigationData } from "$lib/controllers/layoutControllers/redirectHandling.js";

export function load () {
    navigationData.set({ logo: true, navigation: true, socials: false, search: false });
}