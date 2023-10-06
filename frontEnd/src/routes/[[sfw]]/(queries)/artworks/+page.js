
import client from "$lib/sanityClient.js";
import { characterData } from "$lib/queries/characterData.js";

export const load = async () => {
    const [allQueries] = await Promise.all([client.fetch(`{
        "preSearches":
            *[ _type == 'character'] | order(_updatedAt desc) []{
                ${characterData.core}
                ${characterData.info}
                ${characterData.images}
            }
        }`
    )]);

    return allQueries
};
