
import client from "$lib/sanityClient.js";

import { workshopQuery } from "$lib/queryPresets/workshopQueries.js";

export const ssr = false;

export const load = async () => {
    return {
        workshop:
            await client.fetch(`
                *[ _type == 'workshopItem'][] | order(publishedAt desc) {
                    ${workshopQuery.expanded}
                    ${workshopQuery.previews}
                    ${workshopQuery.creation}
                }`)
    };
};