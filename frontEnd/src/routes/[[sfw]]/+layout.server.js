
import client from "$lib/sanityClient.js";
import { socialPlatformQuery } from "$lib/queries/websiteSettings.js";
import {navigationData} from "$lib/pageSettings/redirectHandling.js";

export async function load () {
    navigationData.set({ logo: true, navigation: false, socials: false, search: false });
        // needs to be done on the server to allow the +page to be prioritized.

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
        featured: allQueries.featuredSocials[0].socialMedia}
}