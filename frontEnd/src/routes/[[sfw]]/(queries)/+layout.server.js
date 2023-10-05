
import client from "$lib/sanityClient.js";
import { characterData } from "$lib/queries/characterData.js";

export const load = async () => {
    const [allQueries] = await Promise.all([client.fetch(`{
        "preSearches":
            *[ _type == 'characterOrder'] | order(_updatedAt desc) []{
                characters[]->{
                    ${characterData.core}
                    ${characterData.info}
                    ${characterData.images}
                }
            },
        }`
    )]);

    return allQueries
}