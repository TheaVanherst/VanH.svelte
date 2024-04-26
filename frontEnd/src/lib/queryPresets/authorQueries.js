
const authorQueries = {
    info: `
        searchable,
        fullName,
        handle,
        'slug': slug.current`,
    icon: `
        userPortrait`,
    branding: `
        userPortrait,
        profileBanner`,
    socials: `
        'socialMedia': socialMedia[]{
            url,
            platformName->{
                socialLogo,
                socialURL}}`,
    participation: `
        'participation': participation->emoji + " " + participation->title`,
    internals: `
        authorTag[]-> {
            emoji,
            title},
        internalRole[]-> {
           emoji,
           title}`,
    about: `
        shortDesc`
}

export { authorQueries }