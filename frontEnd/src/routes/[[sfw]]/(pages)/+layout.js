
import { navigationData } from "$lib/settings/navigationHandling.js";

export function load () {
    navigationData.set({ logo: true, navigation: true, socials: true, search: false });
}