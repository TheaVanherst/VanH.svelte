
import { nsfw } from "$lib/pageSettings/redirectHandling.js";

export async function load({ params }) {
    nsfw.set(params.sfw === 'nsfw');
        // needs to be done locally.
};