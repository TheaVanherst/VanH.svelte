
import client from "$lib/settings/sanityClient.js";

import { socialPlatformQuery }  from "$lib/queryPresets/websiteSettings.js";
import { navigationData }       from "$lib/settings/navigationHandling.js";

export const load = async () => {
    navigationData.set(e => ({...e, logo: true, navigation: true, socials: true, search: false }));
        // needs to be done on the server to allow the +page to be prioritized.

    const seachQuery = `| order(title asc) {title, relatedTags, 'type': _type}` // saves copy-paste work
    return {
        socialMedia:
            await client.fetch(`
                *[ _type == 'featuredSocials' ][0].
                    socialMedia[]{
                        chunkName,
                        chunkSocials[]{
                            ${socialPlatformQuery},
                            nsfw,
                            url}}`),
        characters:
            await client.fetch(`*[_type == 'characterOrder'].characters[]->{charIcon, nickName}`),
            // fetches & deals with character searches
        tags:
            await client.fetch(`
                [{"tags": *[_type == 'designTags']` + seachQuery + `,    "nsfw": false},
                {"tags": *[_type == 'explicitTags']` + seachQuery + `,   "nsfw": true},
                {"tags": *[_type == 'genreTag']` + seachQuery + `,       "nsfw": false},
                {"tags": *[_type == 'genericTags']` + seachQuery + `,    "nsfw": false},
                {"tags": *[_type == 'nsfwTags']` + seachQuery + `,       "nsfw": true}]
            `)
            //{"category": "culture",    "tags": *[_type == 'cultureTags']` + seachQuery + `,    "nsfw": false},
    };
}