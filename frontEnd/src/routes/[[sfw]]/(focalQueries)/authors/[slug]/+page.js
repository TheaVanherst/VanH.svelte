
import client from "$lib/sanityClient.js";
import { authorQueries } from "$lib/queryPresets/authorQueries.js";

export const prerender = false;
export const ssr = false;

export const load = async ({ params }) => {
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