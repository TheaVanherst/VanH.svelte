
import { navigationData } from "$lib/controllers/layoutControllers/navigationHandling.js";

export const load = () => {
    navigationData.set({ logo: true, navigation: true, socials: true, search: true });
}