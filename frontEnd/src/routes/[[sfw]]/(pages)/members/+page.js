
import client from "$lib/sanityClient.js";

export const load = async () => {
    return {
        donationData:
            await client.fetch(`
                *[_type == 'donationData'][0] {
                    'tierData': donationTierData.rows[].cells,
                    requestText,
                    tiers
                }`)
    }
}