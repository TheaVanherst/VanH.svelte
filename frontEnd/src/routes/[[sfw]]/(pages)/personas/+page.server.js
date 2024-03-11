
import client from "$lib/sanityClient.js";
import { characterData } from "$lib/queryPresets/characterData.js";

export async function load () {
    return {
        characterData:
            await client.fetch(`
                *[ _type == 'characterOrder'] | order(_updatedAt desc) [0]{
                    characters[]-> {
                        ${characterData.core}
                        ${characterData.info}
                        ${characterData.lore}
                        ${characterData.context}
                        ${characterData.images}
                        ${characterData.sex}
                        ${characterData.height}
                        ${characterData.creation}
                    }}`)
    };
}