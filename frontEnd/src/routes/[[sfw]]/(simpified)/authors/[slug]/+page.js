
import client from "$lib/sanityClient.js";
import { authorQueries } from "$lib/queryPresets/authorQueries.js";
import { navigationData } from "$lib/controllers/layoutControllers/redirectHandling.js";

export const prerender = false;

export const load = async ({ params }) => {
    navigationData.set({ logo: true, navigation: true, socials: false, search: false });

    return {
        authorData:
            await client.fetch(`
                *[ _type == 'author' && slug.current == '${params.slug}'][0]{
                    ${authorQueries.info},
                    ${authorQueries.branding},
                    ${authorQueries.internals},
                    ${authorQueries.about},
                    ${authorQueries.socials}
                }`)
    };
};