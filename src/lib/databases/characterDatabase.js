
const sexes = {
    male: "♀️",
    female: "♂️",
}

// name on the url button // path it takes you to // internal references via. CMS & what to search for.
const characterList = [
    {
        name:       "Valentina",
        fullName:   "Valentina Goss",
        path:       "Valentina.webp",
        nationality:    "Austrian",
        timePeriod:     "19th / 24th century",
        age:            "29 y/o",
        sex:            sexes.male,
        sexuality:      "Lesbian",
        partner:        "Izabela",
        canonHeight:   "6'4",
        nonCanHeight:   undefined,
        occupation:     "Bounty Hunter / Pirate",
        creationDate:   ["2023","2021-2019"],
        desc:   "There are many things one could say to describe Captain Goss. “Dashing”, some might say. “A woman of fortune”, many would agree. Her targets, if they could still speak, would likely describe her as “a damned good shot.”  All of these things, and more, are true. At her core though, Valentina is a woman driven by the pursuit of nothing less than her own success, no matter the cost. You would do well to avoid getting in the way of that."
    },{
        name:       "Bastet",
        fullName:   "Mother of Sol",
        path:       "Bastet.webp",
        nationality:    "Unknown",
        timePeriod:     "Unknown",
        age:            "Unknown",
        sex:            sexes.female,
        sexuality:      "Unknown",
        partner:        "Daughters of the Nile",
        canonHeight:   "4,473,000,000km",
        nonCanHeight:   "Infinite",
        occupation:     "Deity of Fertility",
        creationDate:   ["2023","2021"],
        desc:   "Creation. On a cosmic scale, this is the fundamental force at play in every star, on every planet. The heavens are her tapestry, and as Sol’s Mother and its Guardian, she weaves the night sky with delicate complexity, warding her star and ensuring its safety as it travels the long, cold night. Turn your gaze to the vastness of the cosmos, and within its inky voids and pools of starlight, perhaps you will catch a glimpse of some part of her."
    },{
        name:       "Izabela",
        fullName:   "Izabela Deblanc",
        path:       "Izabela.webp",
        nationality:    "French / Polish Lithuanian",
        timePeriod:     "18th - 19th",
        age:            "48 y/o",
        sex:            sexes.female,
        sexuality:      "Bisexual",
        partner:        "Vastra, Valentina",
        canonHeight:   "9'4 - 11'4",
        nonCanHeight:   "Upto 5 miles",
        beastarCanon:  "6'5",
        occupation:     "Lady of Polish Occupied Prussia",
        creationDate:   ["2023","2020"],
        desc:   "Maîtresse Deblanc, or simply Izabela, to the rare few who she counts among her friends, can be considered to exemplify the term 'motherly'. Her largesse and kindness are second only to her wish to see those under her care prosper, and she will not hesitate to take matters into her own hands to ensure her charges are on the right path. If she really likes you, you may find she comes off as a bit pushy, but she means well.  Mother knows best, after all, so don’t worry, and leave it all to the Mistress of White."
    },{
        name:       "Yumi",
        fullName:   "Yumi Myeong",
        path:       "Yumi.webp",
        nationality:    "Korean",
        timePeriod:     "21st century",
        age:            "32 y/o",
        sex:            sexes.female,
        sexuality:      "Demisexual, Lesbian",
        partner:        "Vahn",
        canonHeight:   "12'9",
        nonCanHeight:   "24'",
        beastarCanon:  "6'10",
        creationDate:   ["2019","2019-2016"],
        occupation:     "Riot Police / Navy Seals Marksman",
        desc:   "Yumi’s battlefield prowess belies a constant internal conflict regarding her body. Her body features a number of “eyes” across its surface, these actually being infrared sensory organs that, when covered by clothing, have greatly reduced if not completely unusable sensory function. Due to her own shyness about them, she prefers this to the alternative of wearing what she considers to be clothing that is far too exposing, but allows her to fully use these “eyes” for greatly enhanced spatial awareness. This allows her to excel in hand to hand combat, where her size and build aid her greatly, though this advantage requires a careful approach to fighting to avoid damaging the sensory organs."
    },{
        name:       "Vahn",
        fullName:   "Vahn Charette Der-spar",
        path:       "Vahn.webp",
        nationality:    "Sri Lanka / British",
        timePeriod:     "21st century",
        age:            "25 y/o",
        sex:            sexes.male + sexes.male,
        sexuality:      "Ace, Lesbian",
        partner:        "Yumi",
        canonHeight:   "7'4",
        nonCanHeight:   "9'7",
        beastarCanon:  "6'4",
        occupation: "University professor",
        creationDate:   ["2022","2020-2018"],
        desc:   "A professor of the arts, specialising in the Digital Media. An earnest, confident woman who expects nothing but the best from her students, and will not tolerate slacking. Headstrong to the point of what some would consider arrogant, she is opinionated and operates under the assumption of right until proven wrong, making her seem scathing to some, but her students can attest to her genuine efforts to both do her best and bring the best out of them."
    },{
        name:       "Vastra",
        fullName:   "Madame Vastra",
        path:       "Vastra.webp",
        nationality:    "Cuban",
        timePeriod:     "18th - 20th",
        age:            "36 y/o",
        sex:            sexes.male,
        sexuality:      "Queer, Dom",
        partner:        "Izabela",
        canonHeight:   "5'8 - 16'4",
        nonCanHeight:   "15'4 - 42'2",
        occupation:     "Snake-oil Sales-woman",
        creationDate:   ["2023","2020"],
        desc:   "To many merchants, this moniker would be a grave insult, but to Vastra, such nomenclature can hardly begin to describe what she does to unwitting customers. Her longest standing contract is with none other than the devil himself, but even he had to admit that Vastra drives one hell of a hard bargain. While her wares would be considered \"cursed\" by many, she views each hex as a fun new way to enjoy her acquisitions, particularly when it comes to her more carnal desires. A shrewd businesswoman through and through, Vastra will fleece you for all you’ve got while convincing you it’s in your best interest, and should you be foolish enough to renege on your pay… Well, she’s never been one to turn down an opportunity to appease her longtime benefactor."
    }
];

export default characterList;