
import { nsfw } from "$lib/controllers/accessibilityController.js";

export const ssr = false;
export const prerender = false;
export const trailingSlash = 'always';

export async function load({ params }) {
    nsfw.set(params.sfw === 'nsfw');
}
