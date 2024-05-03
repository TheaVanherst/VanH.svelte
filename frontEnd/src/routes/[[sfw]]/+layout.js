
import { navigationControls }   from "$lib/controllers/layoutControllers/navigationHandling.js";

export const load = ({ params }) => {
    navigationControls.update(e => ({...e, nsfw: params.sfw === 'afterdark'}));
}