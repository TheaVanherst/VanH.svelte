
import client from "$lib/sanityClient.js";
import { socialPlatformQuery } from "$lib/queries/websiteSettings.js";
import {navigationData} from "$lib/controllers/layoutControllers/redirectHandling.js";

export async function load () {
    navigationData.set({ logo: true, navigation: false, socials: false, search: false });
        // needs to be done on the server to allow the +page to be prioritized.

    return {
        featured:
            await client.fetch(`
                *[ _type == 'featuredSocials' ][0]{
                    socialMedia[]{
                        chunkName,
                        chunkSocials[]{
                            ${socialPlatformQuery},
                            nsfw,
                            url}}}`),
        tags:
            await client.fetch(`{
                "cultureTags": [*[_type == 'cultureTags'] | order(title asc) {title, relatedTags, 'type': _type}, false],
                "designTags": [*[_type == 'designTags'] | order(title asc) {title, relatedTags, 'type': _type}, false],
                "explicitTags": [*[_type == 'explicitTags']| order(title asc) {title, relatedTags, 'type': _type}, true],
                "genreTag": [*[_type == 'genreTag'] | order(title asc) {title, relatedTags, 'type': _type}, false],
                "genericTags": [*[_type == 'genericTags'] | order(title asc) {title, relatedTags, 'type': _type}, false],
                "nsfwTags": [*[_type == 'nsfwTags'] | order(title asc) {title, relatedTags, 'type': _type}, true]
            }`)
    };
}