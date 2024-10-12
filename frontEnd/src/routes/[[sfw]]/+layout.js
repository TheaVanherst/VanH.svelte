
import { navigationControls }   from "$lib/settings/navigationHandling.js";

export const load = ({ params }) => {
    navigationControls.update(e => ({...e, nsfw: params.sfw === 'afterdark'}));
}