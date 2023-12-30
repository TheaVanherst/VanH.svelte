
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
}

export { genericRequests }