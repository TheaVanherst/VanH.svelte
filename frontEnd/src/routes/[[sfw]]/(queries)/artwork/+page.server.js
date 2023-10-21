
import client from "$lib/sanityClient.js";

export const load = async ({url}) => {
    const [allQueries] = await Promise.all([client.fetch(`{
        "artworks":
            *[ _type == 'artworks'][] | order(publishedAt desc) {
                _id,
                pieceName,
                description,
                
                "nsfw": NSFW,
               
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
                            socialMedia
                        }
                    }
                }
            }
        }`
    )]);

    allQueries.page = url.searchParams.get("page") || 0;
    allQueries.search = url.searchParams.get("query") || undefined;

    return allQueries
};