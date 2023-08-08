
const
    gameReferencing = {
        crypt: {
            name: "Crypt of the Necrodancer",
            url: "crypt"
        },
        terraria: {
            name: "Terraria",
            url: "terraria"
        }
    },
    authorReferencing = {
        thea: {
            name: "Thea Vanherst",
            url: "https://twitter.com/TheaVanherst",
        },
        sipher: {
            name: "Sipher Nil",
            url: "https://twitter.com/siphernil"
        }
    };

const workshopArray = [
    {
        thumbnail: "necropony",
        name:       "Crypt of the NecroPony",
        game:       gameReferencing.crypt,
        authors: [  authorReferencing.thea,
                    authorReferencing.sipher ],
        description:
                "A stand alone mod that rehauls, redesigns and reanimates the original Ponies Crypt mod - featuring UI reworks, title cards and bestiaries unique to each character, all of which fully compatible with all the DLCs.",
        url:    "https://steamcommunity.com/sharedfiles/filedetails/?id=2979392248",
    },{
        thumbnail:  "refinedScrolls",
        name:       "Refined Scrolls",
        game:       gameReferencing.crypt,
        authors:  [ authorReferencing.thea,
                    authorReferencing.sipher ],
        description:
                "A pack that replaces the default, meaningless symbols on scrolls to simplistic iconography, and replaces scroll / paper items / equipment.",
        url:    "https://steamcommunity.com/sharedfiles/filedetails/?id=2991894017",
    },{
        thumbnail:  "twoSisters",
        name:       "Journal of the Two Sisters UI",
        game:       gameReferencing.crypt,
        authors: [  authorReferencing.thea,
                    authorReferencing.sipher ],
        description:
                "A HUD extention of the My Little Pony Re-haul Mod. This resource pack is not required, and just adds additional Equestrian themed UI / HUD tweaks - designed for the \"Wealth of Canterlot\" Update [01/06/2023].",
        url:    "https://steamcommunity.com/sharedfiles/filedetails/?id=2984585592",
    },{
        thumbnail:  "thirdImpact",
        name:       "The Third Impact",
        game:       gameReferencing.terraria,
        authors: [  authorReferencing.thea ],
        description:
                "A complete and ongoing overhaul of the Moonlord, redesigning and re-scheming assets to Third Impact from Neon Genesis Evangelion.",
        url:    "https://steamcommunity.com/sharedfiles/filedetails/?id=2449497541",
    },{
        thumbnail:  "evaUnit1",
        name:       "1:1 SCALE EVA Unit 01",
        game:       gameReferencing.terraria,
        authors: [  authorReferencing.thea ],
        description:
                "A 1:1 scale, 330 block tall recreation of Eva Unit: 01 from Neon Genesis Evangelion, holding the Tirpitz. Reported on by PC GAMER, Jan 18th 2021.",
        url:    "https://steamcommunity.com/sharedfiles/filedetails/?id=2440395917"
    }
];

export { workshopArray }