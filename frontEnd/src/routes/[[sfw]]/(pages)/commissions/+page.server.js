
import client from "$lib/sanityClient.js";

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
            },
        }`
    )]);

    return allQueries
}