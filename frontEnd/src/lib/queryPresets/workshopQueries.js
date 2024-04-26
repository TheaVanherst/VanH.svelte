
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
            author[]->,
            publishedAt,`,
        expanded: `
            desc,
            'banner': workshopBanner,`
    };

export { workshopQuery }