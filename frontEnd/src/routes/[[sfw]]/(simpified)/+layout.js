
import { navigationData } from "$lib/settings/navigationHandling.js";

export const load = () => {
    navigationData.set({ logo: true, navigation: true, socials: false, search: false });
}