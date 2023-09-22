
import client from "$lib/sanityClient.js";

export async function load () {
    const [allQueries] = await Promise.all([client.fetch(`{
        "commissionData":
            *[ _type == 'commissionData'][]{
                ...
            },
        "commissionTypes":
            *[ _type == 'commissionTypes'][]{
                ...
            }
        }`
    )]);

    return allQueries
}