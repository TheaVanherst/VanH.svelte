
import client from "$lib/sanityClient.js";
import { socialPlatformQuery } from "$lib/queries/websiteSettings.js";

export async function load({ params }) {
    const [allQueries] = await Promise.all([client.fetch(`{
        "socials" :
            *[ _type == 'author' && handle == 'VanH' ]{
                'platforms': socialMedia[]{
                    ${socialPlatformQuery},
                    visible,
                    url
                }
            },
        }`
    )]);

    return {
        socials: allQueries.socials[0].platforms,
        dParams: params.sfw
    }
}

export const prerender = true;
