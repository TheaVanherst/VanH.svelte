
import client from "$lib/sanityClient.js";
import { characterData } from "$lib/queries/characterData.js";
import { authorQueries } from "$lib/queries/authorQueries.js";
import { genericRequests } from "$lib/queries/genericQueries.js";

export const load = async () => {
    let [allQueries] = await Promise.all([client.fetch(`{
        "artworks":
            *[ _type == 'artworks'][] | order(publishedAt desc) {
                ${genericRequests.info},
                ${genericRequests.sfw},
                'authors': authors[author->_id != '3ad85859-8afa-437f-a74b-d4e83d6d6bdd']{
                    ...,
                    'author': author->{
                        ${authorQueries.info},
                        ${authorQueries.icon},
                        ${authorQueries.socials}
                    },
                    'participation': participation->emoji + " " + participation->title,
                },
                'photoshopRefId': discordReferences.photoshopRef,
                'imageRefId': discordReferences.archiveRef,
                'characters': characters[]->{
                    ...,
                    ${characterData.preview},
                    ${characterData.info}
                },
                'commissionData': commissionData {
                    'commissionType': artType->typeName,
                    'characters': characters[]-> {
                        ${characterData.commInfo},
                        ${characterData.preview},
                        ${characterData.ownership},
                    }
                },
                ${genericRequests.gallery}
                ${genericRequests.tags}
            }
        }`
    )]);

    return allQueries
};