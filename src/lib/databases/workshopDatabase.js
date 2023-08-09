
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
            website: "https://twitter.com/TheaVanherst",
        },
        sipher: {
            name: "Sipher Nil",
            website: "https://twitter.com/siphernil"
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
        url:    "2979392248",
    },{
        thumbnail:  "refinedScrolls",
        name:       "Refined Scrolls",
        game:       gameReferencing.crypt,
        authors:  [ authorReferencing.thea,
                    authorReferencing.sipher ],
        description:
                "A pack that replaces the default, meaningless symbols on scrolls to simplistic iconography, and replaces scroll / paper items / equipment.",
        url:    "2991894017",
    },{
        thumbnail:  "twoSisters",
        name:       "Journal of the Two Sisters UI",
        game:       gameReferencing.crypt,
        authors: [  authorReferencing.thea,
                    authorReferencing.sipher ],
        description:
                "A HUD extention of the My Little Pony Re-haul Mod. This resource pack is not required, and just adds additional Equestrian themed UI / HUD tweaks - designed for the \"Wealth of Canterlot\" Update [01/06/2023].",
        url:    "2984585592",
    },{
        thumbnail:  "thirdImpact",
        name:       "The Third Impact",
        game:       gameReferencing.terraria,
        authors: [  authorReferencing.thea ],
        description:
                "A complete and ongoing overhaul of the Moonlord, redesigning and re-scheming assets to Third Impact from Neon Genesis Evangelion.",
        url:    "2449497541",
    },{
        thumbnail:  "evaUnit1",
        name:       "1:1 SCALE EVA Unit 01",
        game:       gameReferencing.terraria,
        authors: [  authorReferencing.thea ],
        description:
                "A 1:1 scale, 330 block tall recreation of Eva Unit: 01 from Neon Genesis Evangelion, holding the Tirpitz. Reported on by PC GAMER, Jan 18th 2021.",
        url:    "2440395917"
    }
],
workshopMinatureArray = [
    {
        thumbnail: "izabela",
        url: "2970592342",
        game: gameReferencing.crypt,
    },{
        thumbnail: "yumi",
        url: "2959125647",
        game: gameReferencing.crypt,
    },{
        thumbnail: "vahn",
        url: "2893560157",
        game: gameReferencing.crypt,
    },{
        thumbnail: "clothing",
        url: "2880648331",
        game: gameReferencing.terraria,
    },{
        thumbnail: "clouds",
        url: "2869322710",
        game: gameReferencing.terraria,
    },{
        thumbnail: "guns",
        url: "2833427254",
        game: gameReferencing.terraria,
    },{
        thumbnail: "ladyD",
        url: "2880649390",
        game: gameReferencing.terraria,
    },{
        thumbnail: "metroidEquips",
        url: "2833427254",
        game: gameReferencing.terraria,
    },{
        thumbnail: "samus",
        url: "2729601662",
        game: gameReferencing.terraria,
    },{
        thumbnail: "rosalina",
        url: "2714945863",
        game: gameReferencing.terraria,
    },{
        thumbnail: "rosalinaClothing",
        url: "2712920418",
        game: gameReferencing.terraria,
    },{
        thumbnail: "moxxi",
        url: "2464132043",
        game: gameReferencing.terraria,
    },{
        thumbnail: "goblin",
        url: "2464351787",
        game: gameReferencing.terraria,
    },{
        thumbnail: "tavi",
        url: "2463389326",
        game: gameReferencing.terraria,
    },{
        thumbnail: "coffee",
        url: "2472031797",
        game: gameReferencing.terraria,
    },{
        thumbnail: "petra",
        url: "2474964792",
        game: gameReferencing.terraria,
    },{
        thumbnail: "traveller",
        url: "2938035091",
        game: gameReferencing.terraria,
    },{
        thumbnail: "wizard",
        url: "2462522375",
        game: gameReferencing.terraria,
    },{
        thumbnail: "evangelionClothing",
        url: "2450249218",
        game: gameReferencing.terraria,
    },{
        thumbnail: "evangelionOst",
        url: "2458026367",
        game: gameReferencing.terraria,
    }
]

export { workshopArray, workshopMinatureArray }