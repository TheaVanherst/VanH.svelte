
import client from "$lib/sanityClient.js";

import { genericRequests } from "$lib/queryPresets/genericQueries.js";

export const load = async () => {
    return {
        commissionData:
            await client.fetch(`
                *[ _type == 'commissions'][0]{
                    commissionInstructions,
                    commissionExamples[]-> {
                        ${genericRequests.info},
                        ${genericRequests.sfw},
                        ${genericRequests.gallery}},
                    prices[] {
                        'previewImages': previewImages[]->gallery.images[0],
                        'styleName': styleType->styleName,
                        additionalPurchases[] {
                            renderType,
                            additionalPriceTag,
                            renderTypePrice},
                        styleTypes[] {
                            renderTypePrice,
                            'renderType': renderType->renderName},
                        styleDescription},
                    additionalPurchases[] {
                        additionalPrice,
                        purchaseType,
                        'additionalItem': additionalPurchases->purchaseName,
                        'additionalDescription': additionalPurchases->additionalDescription},
                    priceNotices,
                    terms
                }`)
    }
}