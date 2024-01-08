
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
                    }}`),
        workshopData:
            await client.fetch(`
                *[ _type == 'workshopItem'] | order(_updatedAt desc) []{
                    itemName,
                    url,
                    previewImage,
                    shortDesc,
                    'gameLogo': gameTags->gameLogo}`),
        workshopSnippet:
            await client.fetch(`
                *[ _type == 'workshopSnippet'] | order(_updatedAt desc) []{
                    itemName,
                    url,
                    NSFW,
                    previewImage,
                    'gameLogo': gameTags->gameLogo}`),
        githubData:
            await client.fetch(`
                *[ _type == 'githubItem'] | order(_updatedAt desc) []{
                    url,
                    itemName,
                    accentColour,
                    previewImage,
                    shortDesc,
                    'slug': slug.current}`),
        donationData:
            await client.fetch(`
                *[_type == 'donationData'][0] {...}`),
        qAndA:
            await client.fetch(`
                *[_type == 'questionAnswer'][0] {
                    answerer->{
                        userPortrait},
                    questions[]{
                        answer,
                        question,
                        ...,
                        'user': author->{
                            userPortrait,
                            handle}},
                    'anon': fallback->{
                        userPortrait,
                        handle}}`)
    };
}