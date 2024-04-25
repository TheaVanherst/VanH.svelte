
import { navigationData } from "$lib/controllers/layoutControllers/redirectHandling.js";

export const load = async () => {
    navigationData.set({ logo: true, navigation: true, socials: true, search: true });
}