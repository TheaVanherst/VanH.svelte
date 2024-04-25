
import client from "$lib/sanityClient.js";

import { characterProfileData }    from "$lib/queryPresets/characterData.js";
import { defaultArtwork }   from "$lib/queryPresets/genericQueries.js";
import { workshopPreview }  from "$lib/queryPresets/workshopQueries.js";

export const load = async () => {
    return {
        characterData:
            await client.fetch(`
                *[ _type == 'characterOrder'] | order(_updatedAt desc) [0]{
                    characters[]-> {${characterProfileData}}}`),
        artworks:
            await client.fetch(`
                *[ _type == 'artworks'][] | order(publishedAt desc)[0...5] {
                    ${defaultArtwork}}`),
        workshopData:
            {
                full:
                    await client.fetch(`
                        *[ _type == 'highlightedWorkshop'] | order(_updatedAt desc).featuredWorkshopFull[]-> {
                            ${workshopPreview}}`),
                snippets:
                    await client.fetch(`
                        *[ _type == 'highlightedWorkshop'] | order(_updatedAt desc).featuredWorkshopSnippets[]-> {
                            ${workshopPreview}}`)
            },
        githubData:
            await client.fetch(`
                *[ _type == 'githubItem'] | order(_updatedAt desc) []{
                    ...
                }`),
        donationData:
            await client.fetch(`
                *[_type == 'donationData'][0] {
                    tiers}`),
        qAndA:
            await client.fetch(`
                *[_type == 'questionAnswer'][0] {
                    answerer->{
                        userPortrait},
                    questions[]{
                        answer,
                        question,
                        'user': author->{
                            userPortrait,
                            handle}},
                    'anon': fallback->{
                        userPortrait,
                        handle}}`)
    };
}