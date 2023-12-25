import cultureTags from './schemas/tags/culture'

const structure = (S) =>
  S.list()
    .title('Content Types')
    .items([

      ...S.documentTypeListItems()
        .filter((listItem) => ['artworks','alternateArts','erotica'].includes(listItem.getId())),

      S.divider(),

      ...S.documentTypeListItems()
        .filter((listItem) => ['githubItem', 'workshopItem','workshopSnippet'].includes(listItem.getId())),

      S.divider(),

      ...S.documentTypeListItems()
        .filter((listItem) => ['author','character'].includes(listItem.getId())),

      S.divider(),

      ...S.documentTypeListItems()
        .filter((listItem) => ['commissioner','alterCharacter','commissionType'].includes(listItem.getId())),

      S.divider(),

      ...S.documentTypeListItems()
        .filter((listItem) => ['explicitTags','nsfwTags',].includes(listItem.getId())),
      ...S.documentTypeListItems()
        .filter((listItem) => ['designTags',].includes(listItem.getId())),
      ...S.documentTypeListItems()
        .filter((listItem) => ['genericTags','genreTag','cultureTags'].includes(listItem.getId())),

      S.divider(),

      S.listItem()
        .title('Page Data')
        .child(
          S.list()
            .title('Pages')

            .items([
              S.listItem().title('Q&A Section')
                .child(S.document().schemaType('questionAnswer').documentId('questionAnswer')),
              S.listItem().title('Donation Data')
                .child(S.document().schemaType('donationData').documentId('donationData')),
              S.listItem().title('Character Orders')
                .child(S.document().schemaType('characterOrder').documentId('characterList')),

              S.divider(),

              S.listItem().title('Carrd Links')
                .child(S.document().schemaType('featuredSocials').documentId('featuredSocials')),

              S.divider(),

              S.listItem().title('Commission Terms')
                .child(S.document().schemaType('commissionData').documentId('commissionData')),
              S.listItem().title("Commission Dos and Donts")
                .child(S.document().schemaType('commissionTypes').documentId('commissionTypes')),
              S.listItem().title("Commission Pricing")
                .child(S.document().schemaType('commissionPrices').documentId('commissionPrices')),

              S.divider(),
            ])
        ),
      S.divider(),
    ])

export { structure };