
import client from "$lib/sanityClient.js";

export async function load () {
    const [allQueries] = await Promise.all([client.fetch(`{
        "artworks":
            *[ _type == 'artworks'] | order(publishedAt desc) {
                ...,
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