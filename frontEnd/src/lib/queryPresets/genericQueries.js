
import { authorQueries } from "$lib/queryPresets/authorQueries.js";
import { characterData } from "$lib/queryPresets/characterData.js";

const genericRequests = {
    gallery: `
        'gallery': 
            gallery {
                images,
                display,
                'renderType': renderType->renderName,
                'styleType': styleType->styleName
            }`,
    tags: `
        'tags': 
            tagData[]|order(_type desc)-> {
                title,
                relatedTags,
                'type': _type
            }`,
    info: `
        _id,
        pieceName,
        description,
        'slug': slug.current,
        publishedAt`,
    sfw:
        `'nsfw': imageVisibility.NSFW,
         'sfw': imageVisibility.SFW`
};

export { genericRequests }

const
    defaultArtwork =
        `
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
        `,
    defaultDesign =
        `
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
        `;

export { defaultArtwork, defaultDesign}