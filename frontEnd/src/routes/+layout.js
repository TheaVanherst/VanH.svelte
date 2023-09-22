
import { directory, nsfw } from "$lib/controllers/accessibilityController.js";

export const prerender = false;
export const trailingSlash = 'always';

export function load({ params }) {
    nsfw.set(params.sfw === 'nsfw');
    directory.set("/home");
}
