
import client from "$lib/sanityClient.js";

import { defaultDesign } from "$lib/queryPresets/genericQueries.js";

export const ssr = false;

export const load = async () => {
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
                    ${defaultDesign}}`)
    };
};