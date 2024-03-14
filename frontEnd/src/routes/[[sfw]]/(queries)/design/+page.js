
import client from "$lib/sanityClient.js";

import { authorQueries } from "$lib/queryPresets/authorQueries.js";
import { genericRequests } from "$lib/queryPresets/genericQueries.js";

export const ssr = false;

export const load = async ({ fetch, url }) => {

    // let pageData = {}
    // pageData.itemsPerPage = 10;
    // pageData.currentPage = parseInt(url.searchParams.get("page")) || 0;
    // pageData.currentPosition = pageData.currentPage * pageData.itemsPerPage;
    // pageData.futurePosition = (pageData.currentPosition + 1) * pageData.itemsPerPage;
    // pageData.maxPosition = await client.fetch(`count(*[_type == 'queryPages'])`)
    // pageData.maxPages = Math.ceil(pageData.maxPosition / pageData.itemsPerPage);

    return {
        designs:
            await client.fetch(`
                *[ _type == 'alternateArts'][] | order(publishedAt desc) {
                    ${genericRequests.info},
                    ${genericRequests.sfw},
                    'authors': authors[author->_id != '3ad85859-8afa-437f-a74b-d4e83d6d6bdd']{
                        author-> {
                            ${authorQueries.info},
                            ${authorQueries.icon},
                            ${authorQueries.socials}
                        },
                        'participation': participation->emoji + " " + participation->title
                    },
                    ${genericRequests.gallery},
                    ${genericRequests.tags}
                }
            `)
    };
};