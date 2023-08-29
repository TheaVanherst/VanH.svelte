
const
    consistantBonus =
        [
            "Lifetime Discord server access",
            "Access to WIP artworks & designs",
            "Access to supporter only chat channels.",
            "Suggest and give feedback on WIP artworks",
            "Semi-Regular game livestream and servers",
            "Direct communication with me via. DMs or server channels",
        ],
    citation = "Accent texts are exclusive to that donation tier";

const
    donationTiers =
        [{
            class: "supporter",
            accent: 6,
            perks: consistantBonus,
            link: "https://ko-fi.com/theavanherst",
            exclusives: [
                "Second inline on commission slots openings.",
            ],
        },{
            class: "member",
            accent: 1,
            perks: consistantBonus,
            link: "https://ko-fi.com/theavanherst/tiers",
            exclusives: [
                "Access to the entire archive of my artworks, including alternate versions",
                "Downloadable versions of all artworks without watermarks and all future works",
                "Downloadable, archived photoshop files of all artworks",
                "Member exclusive polling and sketches",
                "Semi-regular members only livestreams of WIP artwork",
                "First in line on commission slots openings",
            ],
        }],

    personalMessage =
        [
            "My only form of income as of present is donations and commissions, and is currently my full time job - " +
            "if you wish to help pay the bills, help pay for my transition and support my art, consider donating or " +
            "becoming a member.",
            "I have a bunch of long term goals for members, which is currently not possible with such a small community; " +
            "supporting me through membership helps give me a stable income and invest additional time for polling, " +
            "alternate artworks, and more membership perks.",
            "Thanks for all those whom have supported and continue to support me."
        ];

export { donationTiers, personalMessage, citation }