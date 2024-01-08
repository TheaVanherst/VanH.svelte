
import client from "$lib/sanityClient.js";
import { characterData } from "$lib/queryPresets/characterData.js";
import { authorQueries } from "$lib/queryPresets/authorQueries.js";
import { genericRequests } from "$lib/queryPresets/genericQueries.js";

export const load = async () => {
    return {
        artworks:
            await client.fetch(`
                *[ _type == 'artworks'][] | order(publishedAt desc) {
                    ${genericRequests.info},
                    ${genericRequests.sfw},
                    'authors': authors[author->_id != '3ad85859-8afa-437f-a74b-d4e83d6d6bdd']{
                        author-> {
                            ${authorQueries.info},
                            ${authorQueries.icon},
                            ${authorQueries.socials}},
                        'participation': participation->emoji + " " + participation->title},
                    'photoshopRefId': discordReferences.photoshopRef,
                    'imageRefId': discordReferences.archiveRef,
                    characters[]-> {
                        ${characterData.preview},
                        ${characterData.info}},
                    'commissionData': commissionData {
                        'commissionType': artType-> typeName,
                        characters[]-> {
                            ${characterData.commInfo},
                            ${characterData.preview},
                            ${characterData.ownership}}},
                    ${genericRequests.gallery},
                    ${genericRequests.tags}
                }`)
        };
};