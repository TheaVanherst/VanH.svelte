
import client from "$lib/sanityClient.js";

export async function load () {
    return {
        commissionData:
            await client.fetch(`
                *[ _type == 'commissionData']{...}`),
        commissionTypes:
            await client.fetch(`
                *[ _type == 'commissionTypes']{...}`),
        commissionPrices:
            await client.fetch(`
                *[ _type == 'commissionPrices']{
                    ...,
                    'PreviewImages': PreviewImages[]{
                        ...,
                        'renderType': renderType->renderName,
                        'styleType': styleType->styleName
                    },
                    'prices': prices[]{
                        ...,
                        'styleType': styleType->styleName,
                        'styleTypes': styleTypes[]{
                            ...,
                            'renderType': renderType->renderName
                        }
                    },
                    'additionalPurchases': additionalPurchases[]{
                        additionalPrice,
                        'additionalItem': additionalPurchases->purchaseName,
                        'additionalDescription': additionalPurchases->additionalDescription
                    }
                }`),
    };
}