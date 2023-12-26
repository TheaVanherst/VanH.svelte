
const authorQueries = {
    info: `
        fullName,
        handle,
        'slug': slug.current`,
    icon: `
        userPortrait`,
    socials: `
        'socialMedia': socialMedia[]{
            url,
            platformName->
        }`,
    participation: `
        'participation': participation->emoji + " " + participation->title`
}

export { authorQueries }