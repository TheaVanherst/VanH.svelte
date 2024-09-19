
import client from "$lib/sanityClient.js";
import { defaultArtwork, defaultDesign } from "$lib/queryPresets/genericQueries.js";

export const ssr = false;

export const load = async () => {
    return {
        artworks:
            await client.fetch(`
                *[ _type == 'artworks'][] | order(_createdAt desc)[0...6] {
                    ${defaultArtwork}}`),
        designs:
            await client.fetch(`
                *[ _type == 'alternateArts'][] | order(_createdAt desc)[0...4] {
                    ${defaultDesign}}`),
        highlighted:
            await client.fetch(`
                *[ _type == 'featuredWorks'][] | order(publishedAt desc).featuredArtworks[]-> {
                    ${defaultArtwork}}`)};};