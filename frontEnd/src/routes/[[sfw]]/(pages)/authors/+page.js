
import client from "$lib/settings/sanityClient.js"

import { authorQueries }    from "$lib/queryPresets/authorQueries.js";
import { genericRequests }  from "$lib/queryPresets/genericQueries.js";

export const load = async () => {
    return {
        authorData:
            await client.fetch(`
                *[ _type == 'author' && searchable == true] | order(_createdAt asc) []{
                    ${authorQueries.info},
                    ${authorQueries.branding},
                    ${authorQueries.internals},
                    ${authorQueries.about},
                    ${authorQueries.socials},
                    "latestArtworks": *[_type == 'artworks' && references(^._id)] | order(publishedAt desc)[0...12] {
                        ${genericRequests.info},
                        ${genericRequests.sfw},
                        ${genericRequests.gallery},
                        ${authorQueries.referenceParticipation}
                    },
                    "latestDesigns": *[_type == 'alternateArts' && references(^._id) && imageVisibility.NSFW != true] | order(publishedAt desc)[0...3] {
                        ${genericRequests.info},
                        ${genericRequests.sfw},
                        ${genericRequests.gallery},
                        ${authorQueries.referenceParticipation}
                    },
                }`)
    };
}