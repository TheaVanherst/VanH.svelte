
import client from "$lib/sanityClient.js";

import { characterData }    from "$lib/queryPresets/characterData.js";
import { authorQueries }    from "$lib/queryPresets/authorQueries.js";
import { genericRequests }  from "$lib/queryPresets/genericQueries.js";
import {navigationData} from "$lib/controllers/layoutControllers/redirectHandling.js";

export const prerender = false;
export const ssr = false;



export const load = async ({ params }) => {
    navigationData.set({ logo: true, navigation: true, socials: true, search: false });

    return {
        erotica:
            await client.fetch(`
                *[ _type == 'erotica' && slug.current == '${params.slug}' ][] | order(publishedAt desc){
                    ${genericRequests.info},
                    image,
                    story,
                    'characters': characters[]->{
                        ${characterData.preview},
                        ${characterData.info}},
                    'authors': authors[author->_id != '3ad85859-8afa-437f-a74b-d4e83d6d6bdd'].author->{
                        ${authorQueries.info},
                        ${authorQueries.icon},
                        ${authorQueries.participation},
                        ${authorQueries.socials}},
                    ${genericRequests.tags}
                }[0]`
            ),
    };
};