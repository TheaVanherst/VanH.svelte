
import { navigationControls } from "$lib/pageSettings/redirectHandling.js";

export async function load({ params }) {
    navigationControls.update(e => ({...e, nsfw: (params.sfw === 'nsfw')}));
        // needs to be done locally.
};