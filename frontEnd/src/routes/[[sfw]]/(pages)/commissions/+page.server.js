
import client from "$lib/sanityClient.js";

export const prerender = true;

export async function load () {
    const [allQueries] = await Promise.all([client.fetch(`{
        "commissionData":
            *[ _type == 'commissionData']{
                ...
            },
        "commissionTypes":
            *[ _type == 'commissionTypes']{
                ...
            },
        "commissionPrices":
            *[ _type == 'commissionPrices']{
                ...
            },
        }`
    )]);

    return allQueries
}