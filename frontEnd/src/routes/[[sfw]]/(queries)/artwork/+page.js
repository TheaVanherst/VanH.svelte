
import client from "$lib/settings/sanityClient.js";

import { defaultArtwork } from "$lib/queryPresets/genericQueries.js";

export const ssr = false;

export const load = async () => {
    return {
        artworks:
            await client.fetch(`
                *[ _type == 'artworks'][] | order(publishedAt desc) {
                    ${defaultArtwork}
                }`)
        };
};