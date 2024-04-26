
import { authorQueries } from "$lib/queryPresets/authorQueries.js";

const
    workshopQuery = {
        previews: `
            itemName,
            url,
            shortDesc,
            NSFW,
            previewImage,
            'gameLogo': gameTags->gameLogo,
            'slug': slug.current,`,
        creation: `
            "authors": author[]->{
                ${authorQueries.info},
                ${authorQueries.icon},
                ${authorQueries.socials}},
            publishedAt,`,
        expanded: `
            desc,
            'banner': workshopBanner,`
    };

export { workshopQuery }