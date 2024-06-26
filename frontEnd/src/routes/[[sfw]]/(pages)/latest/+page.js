
import client from "$lib/sanityClient.js";
import { defaultArtwork, defaultDesign } from "$lib/queryPresets/genericQueries.js";

export const ssr = false;

export const load = async () => {
    return {
        artworks:
            await client.fetch(`
                *[ _type == 'artworks'][] | order(publishedAt desc)[0...8] {
                    ${defaultArtwork}}`),
        designs:
            await client.fetch(`
                *[ _type == 'alternateArts'][] | order(publishedAt desc)[0...4] {
                    ${defaultDesign}}`),
        highlighted:
            await client.fetch(`
                *[ _type == 'featuredWorks'][] | order(publishedAt desc).featuredArtworks[]-> {
                    ${defaultArtwork}}`)
    };
};