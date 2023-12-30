
import {navigationControls} from "$lib/controllers/layoutControllers/redirectHandling.js";

export async function load({ params }) {
    navigationControls.update(e => ({...e, nsfw: params.sfw === 'afterdark'}));
}