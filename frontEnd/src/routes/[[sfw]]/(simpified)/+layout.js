
import { navigation } from "$lib/pageSettings/redirectHandling.js";

export function load () {
    navigation.set({ logo: true, navigation: true, socials: false, search: false });
}