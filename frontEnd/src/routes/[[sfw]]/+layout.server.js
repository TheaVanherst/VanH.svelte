
import { nsfw } from "$lib/controllers/accessibilityController.js";

export function load({ params }) {
    nsfw.set(params.sfw === 'nsfw');
}

export const prerender = true;
