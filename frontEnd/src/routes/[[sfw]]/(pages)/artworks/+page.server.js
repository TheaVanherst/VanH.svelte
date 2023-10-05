
import client from "$lib/sanityClient.js";

export async function load () {
    const [allQueries] = await Promise.all([client.fetch(`{
        "artworks":
            *[ _type == 'artworks'][0...10] | order(publishedAt desc) {
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
            }
        }`
    )]);

    return allQueries
}