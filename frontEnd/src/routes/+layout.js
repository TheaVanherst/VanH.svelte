
import { nsfw } from "$lib/controllers/accessibilityController.js";

export const prerender = false;
export const trailingSlash = 'always';

export async function load({ctx, params }) {
    nsfw.set(params.sfw === 'nsfw');
}
