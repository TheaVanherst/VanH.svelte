
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
                socialName,
                socialLogo,
                socialURL,
                socialNickname,}}`,
    participation: `
        'participation': participation->emoji + " " + participation->title`,
    referenceParticipation:`
        'description': authors[references(^.^._id)][0]{'string': participation->emoji + " " + participation->title}.string`,
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