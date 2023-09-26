
import client from "$lib/sanityClient.js";

export async function load () {
    const [allQueries] = await Promise.all([client.fetch(`{
        "characterData":
            *[ _type == 'character'] | order(_updatedAt desc) []{
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
                    },
                'developmentStatus': 
                    developmentStatus->{
                        emoji,
                        statusName
                    }
            },
        "workshopData":
            *[ _type == 'workshopItem'] | order(_updatedAt desc) []{
                itemName,
                url,
                previewImage,
                shortDesc,
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
                shortDesc,
                'slug': slug.current
            },
        "donationBuffs":
            *[_type == 'donationTier' && featured == true][] {
                ...
            },
        "donationPerks":
            *[_type == 'donationTier' && featured == false][] {
                ...
            },
        "donationData":
            *[_type == 'donationData'][] {
                ...
            },
        "qAndA":
            *[_type == 'questionAnswer'][] {
                answerer->{
                        userPortrait
                    },
                questions[]{
                    answer,
                    question,
                    ...,
                    'user': author->{
                        userPortrait,
                        handle
                    }
                },
                'anon': fallback->{
                    userPortrait,
                    handle
                }
            }
        }`
    )]);

    return allQueries
}