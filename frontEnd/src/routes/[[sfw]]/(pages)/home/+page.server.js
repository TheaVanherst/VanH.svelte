
import client from "$lib/sanityClient.js";


export async function load ( ) {
    const [allQueries] = await Promise.all([client.fetch(`{
        "characterData":
            *[ _type == 'character'][]{
                ...,
                'sex': sex->emoji,
                'slug': slug.current,
                'partners':
                    partners[]->{
                        'fullName': fullName,
                        'nickName': nickName,
                        'sex': sex->emoji,
                        'age': age,
                        'slug': slug.current,
                        'charIcon': charIcon
                    },
                'heights':
                    heights[]{
                        'loreType': loreType->loreType,
                        'height': canonHeightLow
                    }
            },
        "workshopData":
            *[ _type == 'workshopItem'] | order(_updatedAt desc) []{
                previewImage,
                shortDesc,
                itemName,
                url,
                'gameLogo': gameTags->gameLogo
            },
        "workshopSnippet":
            *[ _type == 'workshopSnippet'] | order(_updatedAt desc) []{
                itemName,
                url,
                NSFW,
                previewImage,
                'gameLogo': gameTags->gameLogo
            },
        "githubData":
            *[ _type == 'githubItem'] | order(_updatedAt desc) []{
                url,
                itemName,
                accentColour,
                previewImage,
                shortDesc
            },
        "donationBuffs": 
            *[_type == 'donationTier' && featured == true][] {
                ...
            },
        "donationPerks":
            *[_type == 'donationTier' && featured == false][] {
                ...
            },
    }`)]);
    return allQueries
}