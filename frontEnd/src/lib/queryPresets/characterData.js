
const characterData = {
    core: `
        'nsfw': NSFW,
        'slug': slug.current,
        _id,`,
    info: `
        species,
        fullName,
        nickName,
        'description': desc,`,
    commInfo: `
        charIcon,
        fullName`,
    lore: `
        job,
        lore,`,
    context: `
        'sex': sex->emoji,
        species,
        nationality,
        timePeriod,
        birthday,
        age,`,
    preview: `
        charIcon`,
    images: `
        'icon': charIcon,
        'render': fullRender,`,
    sex: `
        'sex': sex->emoji,
        'partners':
            partners[]->{
                'fullName': fullName,
                 'nickName': nickName,
                'sex': sex->emoji,
                'age': age,
                'slug': slug.current,
                'charIcon': charIcon
            },`,
    height: `
        'heights':
            heights[]{
                'loreType': loreType->loreType,
                'height': canonHeightLow},`,
    creation: `
        creation,
        prevcreation,
        'developmentStatus': 
            developmentStatus->emoji + " " + developmentStatus->statusName,`,
    ownership: `
        'owner': owner-> {
            handle,
            userPortrait,
            slug,
            'socialMedia': socialMedia[]{
                url,
                platformName->
            }
        }`,
}

export { characterData }