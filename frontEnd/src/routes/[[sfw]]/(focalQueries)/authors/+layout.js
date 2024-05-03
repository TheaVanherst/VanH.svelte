
import { navigationData } from "$lib/controllers/layoutControllers/navigationHandling.js";

export const load = async () => {
    navigationData.set({ logo: true, navigation: true, socials: true, search: false });
}