
import { navigationSettings } from "$lib/pageSettings/redirectHandling.js";

export function load () {
    navigationSettings.set({ logo: true, navigation: true, socials: false, search: false });
}