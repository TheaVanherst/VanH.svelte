
import client from "$lib/sanityClient.js";
import { socialPlatformQuery } from "$lib/queryPresets/websiteSettings.js";
import { navigationData } from "$lib/controllers/layoutControllers/redirectHandling.js";

export async function load () {
    navigationData.set({ logo: true, navigation: true, socials: true, search: false });
        // needs to be done on the server to allow the +page to be prioritized.

    const seachQuery = `| order(title asc) {title, relatedTags, 'type': _type}`
        // saves copy-paste work
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
            Object.entries(
                await client.fetch(`{
                    "cultureTags": [*[_type == 'cultureTags']` + seachQuery + `, false],
                    "designTags": [*[_type == 'designTags']` + seachQuery + `, false],
                    "explicitTags": [*[_type == 'explicitTags']` + seachQuery + `, true],
                    "genreTag": [*[_type == 'genreTag']` + seachQuery + `, false],
                    "genericTags": [*[_type == 'genericTags']` + seachQuery + `, false],
                    "nsfwTags": [*[_type == 'nsfwTags']` + seachQuery + `, true]}`))
                // array is stored as [{data}, {NSFW front-end check}]
    };
}