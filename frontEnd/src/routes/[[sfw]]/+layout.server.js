
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
        tags:
            await client.fetch(`
                [
                    {"tags": *[_type == 'designTags']${seachQuery}},
                    {"tags": *[_type == 'explicitTags']${seachQuery}},
                    {"tags": *[_type == 'nsfwTags']${seachQuery}},
                    {"tags": *[_type == 'genreTag']${seachQuery}},
                    {"tags": *[_type == 'genericTags']${seachQuery}},
                    {"tags": *[_type == 'characterOrder'].characters[]->{"type": "characterTags", "relatedTags": fullName, "title": ":"+nickName, "icon": charIcon}}
                ]
            `)
    };
}