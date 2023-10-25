
import client from "$lib/sanityClient.js";
import { socialPlatformQuery } from "$lib/queries/websiteSettings.js";

export async function load({ params }) {
    const [allQueries] = await Promise.all([client.fetch(`{
        "featuredSocials" :
            *[ _type == 'featuredSocials' ]{
                socialMedia[]{
                    chunkName,
                    chunkSocials[]{
                        ${socialPlatformQuery},
                        nsfw,
                        url
                    }
                }
            }
        }`
    )]);

    return {
        dParams: params.sfw,
        featured: allQueries.featuredSocials[0].socialMedia
    }
}

export const prerender = true;
