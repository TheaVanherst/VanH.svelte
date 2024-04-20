import client from "$lib/sanityClient.js";

export async function load () {
    let data = {
        donationData:
            await client.fetch(`
                *[_type == 'donationData'][0] {
                    'tierData': donationTierData.rows[].cells,
                    requestText,
                    tiers
                }`)
    }
    return data;
}