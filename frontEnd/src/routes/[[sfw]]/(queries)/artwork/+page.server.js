
import client from "$lib/sanityClient.js";

export const load = async ({ fetch, url }) => {

    // let pageData = {}
    // pageData.itemsPerPage = 10;
    // pageData.currentPage = parseInt(url.searchParams.get("page")) || 0;
    // pageData.currentPosition = pageData.currentPage * pageData.itemsPerPage;
    // pageData.futurePosition = (pageData.currentPosition + 1) * pageData.itemsPerPage;
    // pageData.maxPosition = await client.fetch(`count(*[_type == 'queryPages'])`)
    // pageData.maxPages = Math.ceil(pageData.maxPosition / pageData.itemsPerPage);

    let [allQueries] = await Promise.all([client.fetch(`{
        "artworks":
            *[ _type == 'artworks'][] | order(publishedAt desc) {
                _id,
                pieceName,
                description,
                
                "sfw": !NSFW,
               
                'slug': slug.current,
                publishedAt,
                
                'authors': authors[author->_id != '3ad85859-8afa-437f-a74b-d4e83d6d6bdd']{
                    ...,
                    'author': author->{
                        fullName,
                        handle,
                        profileBanner,
                        'slug': slug.current,
                        userPortrait,
                        'socialMedia': socialMedia[]{
                            url,
                            platformName->
                        }
                    },
                    'participation': participation->emoji + " " + participation->title,
                },
                
                'gallery': gallery {
                    images,
                    display,
                    'renderType': renderType->renderName,
                    'styleType': styleType->styleName
                },
                
                'photoshopRefId': discordReferences.photoshopRef,
                'imageRefId': discordReferences.archiveRef,
                'characters': characters[]->{
                    fullName,
                    charIcon,
                    fursona,
                    nickName
                },
                
                'commissionData': commissionData {
                    'commissionType': artType->typeName,
                    'characters': characters[]-> {
                        charIcon,
                        fullName,
                        ...,
                        'owner': owner-> {
                            handle,
                            userPortrait,
                            slug,
                            'socialMedia': socialMedia[]{
                                url,
                                platformName->
                            }
                        }
                    }
                },
                
                'tags': tagData[]|order(_type desc)-> {
                    title,
                    'type': _type
                }
            }
        }`
    )]);

    // allQueries.pageData = pageData;

    return allQueries
};