
import client from "$lib/sanityClient.js";

import { characterData }    from "$lib/queryPresets/characterData.js";
import { authorQueries }    from "$lib/queryPresets/authorQueries.js";
import { genericRequests }  from "$lib/queryPresets/genericQueries.js";

export const prerender = false;
export const ssr = false;

export const load = async ({ params}) => {
    return {
        erotica:
            await client.fetch(`
                *[ _type == 'erotica' && slug.current == '${params.slug}' ][] | order(publishedAt desc){
                    ${genericRequests.info},
                    image,
                    story,

                    'characters': characters[]->{
                        ...,
                        ${characterData.preview},
                        ${characterData.info}},
                    'authors': authors[]{
                        author->{
                            ${authorQueries.info},
                            ${authorQueries.icon},
                            ${authorQueries.socials}},
                        'participation': participation->title
                    },
                    ${genericRequests.tags}
                }[0]`
            ),
    };
};