
import { navigationData } from "$lib/pageSettings/redirectHandling.js";

export function load () {
    navigationData.set({ logo: true, navigation: true, socials: true, search: true });
}