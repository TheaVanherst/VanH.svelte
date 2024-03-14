
import client from "$lib/sanityClient.js"

import { authorQueries } from "$lib/queryPresets/authorQueries.js";

export async function load () {
    return {
        authorData:
            await client.fetch(`
                *[ _type == 'author' && _id != '3ea425ac-3ba0-4102-a800-974b39c3d2bf'] | order(_createdAt asc) []{
                    ${authorQueries.info},
                    ${authorQueries.branding},
                    ${authorQueries.internals},
                    ${authorQueries.about},
                    ${authorQueries.socials}
                }`)
    };
}