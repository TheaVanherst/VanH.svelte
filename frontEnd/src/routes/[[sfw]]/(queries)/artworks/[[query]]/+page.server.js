
import client from "$lib/sanityClient.js";
import { characterData } from "$lib/queries/characterData.js";

import { queryGenerator } from "$lib/queries/queryBuilder.js";

export const load = async ({params}) => {
    const { query } = params
    let queryString = queryGenerator(query);

    const [allQueries] = await Promise.all([client.fetch(`{
        "artworks":
            *[ _type == 'artworks' ${queryString}][0...10] | order(publishedAt desc) {
                ...,
                'gallery': gallery {
                    ...,
                    'renderType': renderType->renderName,
                    'styleType': styleType->styleName
                },
                'characters': characters[]->{
                    fullName,
                    charIcon,
                    owner,
                    fursona
                },
                'commissionData': commissionData {
                    'artType': artType-> {
                        typeName,
                        preName
                    },
                    'characters': characters[]-> {
                        charIcon,
                        fullName,
                        'owner': owner-> {
                            handle,
                            userPortrait,
                            slug,
                            socialMedia
                        }
                    }
                },
            },
        "preSearches":
            *[ _type == 'character'] | order(_updatedAt desc) []{
                ${characterData.core}
                ${characterData.info}
                ${characterData.images}
            },
        }`
    )]);

    return allQueries
}