
import client from "$lib/sanityClient.js";

export const load = async ({ fetch, url }) => {

    // let pageData = {}
    // pageData.itemsPerPage = 10;
    // pageData.currentPage = parseInt(url.searchParams.get("page")) || 0;
    // pageData.currentPosition = pageData.currentPage * pageData.itemsPerPage;
    // pageData.futurePosition = (pageData.currentPosition + 1) * pageData.itemsPerPage;
    // pageData.maxPosition = await client.fetch(`count(*[_type == 'artworks'])`)
    // pageData.maxPages = Math.ceil(pageData.maxPosition / pageData.itemsPerPage);

    const [allQueries] = await Promise.all([client.fetch(`{
        "design":
            *[ _type == 'alternateArts'][] | order(publishedAt desc) {
                _id,
                pieceName,
                description,
               
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
            }
        }`
    )]);

    // allQueries.pageData = pageData;

    return allQueries
};