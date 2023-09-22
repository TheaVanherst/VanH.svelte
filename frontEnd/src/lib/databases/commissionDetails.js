
const
    commissionTypes =
        [
            {
                title: "Rendered Sheet",
                description:
                    "A full page of various drawings on the subject/character of your choice, " +
                    "optionally being a sequence. Typically of 2-6 pages in length, with various lines of dialog and, " +
                    "effects being included. Specifics on each sketch is discussed through various anatomy " +
                    "drawings, with the option to extend to a second page of sketches in a later commission being a " +
                    "possibility.",
                prices: [["Lines","200"],["Flats","230"],["Details & shaded","270"]],
                adPrices: [["Extra characters","35"],["Extra micros","25"]]
            },{
                title: "Full Render",
                description:
                    "A singular, page filling drawing with a simple background with a complicated pose, or a detailed " +
                    "background in a simple pose - typically featuring one or two characters as is treated as a single," +
                    "stand along piece and feature one or two lines of dialog if requested.",
                prices: [["Lines","130"],["Flats","150"],["Details & shaded","200"]],
                adPrices: [["Extra characters","40"],["Extra micros","15"]]
            },{
                title: "Sketch",
                description:
                    "A single drawing of a character in a pose of your choice, complimented by a simple background.",
                prices: [["Lines","60"],["Flats","65"],["Simple Shading","80"]],
                adPrices: [["Extra characters","35"],["Extra micros","15"]],
            },{
                title: "Full Render Solo",
                description:
                    "A single full-render-esc drawing used across the majority of my artworks, typically full body in a simplistic pose with " +
                    "a complimentary background trademark background. Lines are refined, and lighting is done through a single passing.",
                prices: [["Lines","90"],["Flats","100"],["Simplistic shading","120"]],
                adPrices: [["Extra characters","40"],["Extra micros","20"],["Complex background","30"]]
            }
        ],

    additionalPurchases =
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
        ],

    exampleArr =
        [
            {
                img: "bastetFullRender",
                title: "Goddess of Sol",
                type: `${commissionTypes[1].title}, ${commissionTypes[1].prices[2][0]}`,
                source: "1681815430573244420",
                nsfw: true,
            },{
                img: "doorFrame",
                title: "Mistress in Transit",
                type: `${commissionTypes[3].title}, ${commissionTypes[3].prices[2][0]}`,
                source: "1699859046797357377",
                nsfw: true,
            },{
                img: "CheeksOfLove",
                title: "Cheeks of Love",
                type: `${commissionTypes[2].title}, ${commissionTypes[2].prices[2][0]}`,
                source: "1681815430573244420",
                nsfw: true,
            },{
                img: "DaurineMoonlight",
                title: "A Moonlit Ritual",
                type: `${commissionTypes[0].title}, ${commissionTypes[0].prices[2][0]}`,
                source: "1692547932971471062",
                nsfw: true
            }
        ];

export { exampleArr, commissionTypes, additionalPurchases }
