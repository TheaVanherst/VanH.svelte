
const
    citation = "Accent texts would depend on the circumstance"

const
    dosAndDonts =
        [
            {
                class: "Will do;",
                accent: 3,
                perks: [
                    "Lactation, Cum",
                    "Hyper breasts, Hyper ass",
                    "Hyper balls, Hyper penis",
                    "Breast expansion, Ass expansion",
                    "Penis Expansion, Balls expansion",
                    "Macro of any scale"],
            },{
                class: "Wont do;",
                accent: 1,
                perks: [
                    "Pregnancy, Inflation",
                    "Gore, Damage or Harm",
                    "Watersports, Scat",
                    "Overweight, Fat"],
                exclusives: [
                    "Males",
                    "Vore"]
            }
        ];

export { dosAndDonts, citation }

const
    notices =
        [
            "Please note that commissions will be actively sought out for whatever I personally " +
            "find preferable and more enjoyable to draw, I retain the right to not want to choose " +
            "tyour commission. If you are not selected, I want to make clear that it isn't a grudge " +
            "against you personally - If you want to be more actively sought out for a commission, " +
            "giving more creative freedom will make it more likely.",

            "Progress done will always be forwarded to my " +
            "discord server after the initial sketch / development stages are complete. If you " +
            "wish to keep this secret, payment and specification of this privacy is required. " +
            "This also applies to Photoshop files remaining private.",

            "You are also obligated to hand a reference sheet that is clear, consistent and " +
            "doesn't give unclear indication to colour tones, details or character features. " +
            "Please give clear character sheets! I may be less likely to accept your commission " +
            "if you do.",

            "Some specific commission requests may require additional costs on-top depending on what I " +
            "may suspect take longer as it may be something I'm less familiar in drawing and something I " +
            "know will take more iterations for me to get accurate. If I'm not 100% happy with the final " +
            "result, you may be refunded if you are adamant you want something specific from me and I am " +
            "unable to do it."
        ],

    howToCom =
        [
            "Commissions are only accessible via slot openings, or for mutuals. Openings are then done in " +
            "stages, going through multiple steps until all slots are filled - typically 2 slots at a time.",

            "Slots are always opened on Discord for Members first, if slots aren't fully filled within " +
            "a couple days, they'll then be opened to regular donators, and finally via. a twitter post. " +
            "Mutual will usually be able to grab an opening at any time, and previous commissioners will " +
            "typically be prioritized based on a previous good or bad experience.",

            "To gain access to the exclusive Discord server, a donation or membership is required via. " +
            "Ko-fi. Information regarding bonuses and perks can be found on the home page.",

            "Commission payments will be done via. Paypal. You are required to include during your form " +
            "submission, once I am full available, I'll shortly send you an invoice. Once the invoice is " +
            "fully paid, you will be the next project I will work on after completing other ongoing projects.",
        ],

    benefits =
        [
            "No water marks will be featured on the final result of the drawing, that you receive and as " +
            "per my Commission Terms",

            "You are not obliged to credit me as the artist for personal use.",

            "As a Member, will receive all files required to not only create the drawing, but also alternate " +
            "versions of the drawing such as lines, flats and shading.",

            "You can do anything you want with the commission result, as long as it doesn't involve " +
            "reselling the content. If you wish to then have it coloured or shaded by someone else, " +
            "that is completely acceptable as per the Commission Terms.",

            "You will receive a lot more back and forth for the progress being done, and have a bit" +
            "more hands on to what is being worked on."
        ],

    tnc =
        [
            "The drawings produced by the commission are, for all intensive purposes, yours. " +
            "However, this ownership excludes commercial rights and you cannot produce and sell " +
            "content containing them, nor will I via. the terms of the Attribution-NonCommercial-ShareAlike " +
            "license. In the instance of wanting to sell them, a future agreement will have to be made " +
            "on-top of the original commission price, as it is against my personal interest to do so. your " +
            "commission will never be resold off as separate artwork without the knowledge beforehand.",

            "You have full permission to edit the drawings however you please, but watermarks must not " +
            "be featured on them. Any edits should be addressed, and should also include credit to the " +
            "original artist as per the Attribution-NonCommercial-ShareAlike license.",

            "Although watermarks must not be included on the artworks, including your own personal ownership, " +
            "watermarks may be included on my own personal social media posts, but members have the ability " +
            "to download the artwork, watermark free.",

            "You are not required to state I created them, but are obliged to not claim them a your " +
            "own creations. However, crediting me / linking me in any way is highly appreciated and " +
            "supports my work, I simply do not want to force you to do so in every instance.",

            "The end product is something that I can use for my own personal archive / self promotional " +
            "purposes. For example, all drawings will be posted to my twitter and archived on my website - " +
            "I will not however, use them for my own personal gain, and only to show as example of my own " +
            "creative output.",

            "If payment is not met for any reason, or additional fees are required and not paid, your " +
            "commission will be refunded and will be offered / auctioned off to someone else. This also " +
            "includes refunding after the initialization of the commission.",

            "Refunds are accepted prior to the final sketch and you've agreed that you are happy with the " +
            "line-work being started. Once I start the lines, I will not accept your refund."
        ];

export { notices, howToCom, benefits, tnc }

const commissionTypes =
    [
        {
            title: "Rendered Sheet",
            description:
                "A full page of various drawings on the subject/character of your choice, " +
                "optionally being a sequence. Typically of 2-6 pages in length, with various lines of dialog and, " +
                "effects being included. Specifics on each sketch is discussed through various anatomy " +
                "drawings, with the option to extend to a second page of sketches in a later commission being a " +
                "possibility.",
            prices: [["Lines","200"],["Flats","230"],["Details & Shaded","270"]],
            adPrices: [["Extra characters","35"],["Extra micros","25"]]
        },{
            title: "Full Render",
            description:
                "A singular, page filling drawing with a simple background with a complicated pose, or a detailed " +
                "background in a simple pose - typically featuring one or two characters as is treated as a single," +
                "stand along piece and feature one or two lines of dialog if requested.",
            prices: [["Lines","130"],["Flats","150"],["Details & Shaded","200"]],
            adPrices: [["Extra characters","40"],["Extra micros","15"]]
        },{
            title: "Sketch",
            description:
                "A single drawing of a character in a pose of your choice, complimented by a simple background.",
            prices: [["Lines","60"],["Flats","65"],["Simple Shading","80"]],
            adPrices: [["Extra characters","35"],["Extra micros","15"]],
        }
    ];

const additionalPurchases =
    [
        {
            title: 'Photoshop files',
            description:
                'Photoshop files are included in the Discord archive, and are free for future and current members. ' +
                'Photoshop files can also be purchased at any given time in the future.',
            price: '10.00'
        },{
            title: 'Private Photoshop files',
            description:
                "If you wish to keep project files private, this would required to be specified before or during the " +
                "regular commission process. This purchase option includes the Photoshop file download, which is then " +
                "exclusive to you; it will not be available for members.",
            price: '35.00'
        },{
            title: 'Late Shading / Flats',
            description:
                "In the instance of you purchasing lines or flats, you may want to then have your commission have it shaded." +
                "This purchase option is a means to provide shading or flats at a later date from the original " +
                "commission. Eg. If you purchase lines, and want it to have flats & shading, it will be the value of (Shaded - " +
                "Lines). Eg. Shading at 270, minus lines 200, equaling a cost of £70.",
            price: '20.00 and upwards'
        }
    ]

export { commissionTypes, additionalPurchases }

const exampleArr =
    [
        {
            img: "bastetFullRender",
            title: "Goddess of Sol",
            type: `${commissionTypes[1].title}, ${commissionTypes[1].prices[2][0]}`,
            source: "1681815430573244420",
            nsfw: false
        },{
            img: "CheeksOfLove",
            title: "Cheeks of Love",
            type: `${commissionTypes[2].title}, ${commissionTypes[2].prices[2][0]}`,
            source: "1681815430573244420",
            nsfw: false
        },{
            img: "DaurineMoonlight",
            title: "A Moonlit Ritual",
            type: `${commissionTypes[0].title}, ${commissionTypes[0].prices[2][0]}`,
            source: "1692547932971471062",
            nsfw: true
        },{
            img: "PalterySwimwear",
            title: "Paltry Swimwear",
            type: `${commissionTypes[0].title}, ${commissionTypes[0].prices[2][0]}`,
            source: "1695100150383841525",
            nsfw: true
        }
    ];

export { exampleArr }