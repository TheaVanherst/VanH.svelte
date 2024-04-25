
import { navigationControls }   from "$lib/controllers/layoutControllers/redirectHandling.js";

export const load = ({ params }) => {
    navigationControls.update(e => ({...e, nsfw: params.sfw === 'afterdark'}));
}