import cultureTags from './schemas/tags/culture'

const structure = (S) =>
  S.list()
    .title('Content Types')
    .items([

      ...S.documentTypeListItems()
        .filter((listItem) => ['artworks','alternateArts','erotica'].includes(listItem.getId())),
      ...S.documentTypeListItems()
        .filter((listItem) => ['githubItem', 'workshopItem'].includes(listItem.getId())),

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
        .title('Page Settings')
        .child(
          S.list()
            .title('Pages')

            .items([
              S.listItem().title('Q&A Section')
                .child(S.document().schemaType('questionAnswer').documentId('questionAnswer')),
              S.listItem().title('Carrd Links')
                .child(S.document().schemaType('featuredSocials').documentId('featuredSocials')),

              S.divider(),

              S.listItem().title('Character Orders')
                .child(S.document().schemaType('characterOrder').documentId('characterList')),

              S.divider(),

              S.listItem().title('Donation Data')
                .child(S.document().schemaType('donationData').documentId('donationData')),
              S.listItem().title("Commission Data")
                .child(S.document().schemaType('commissions').documentId('commissions')),

              S.divider(),

              S.listItem().title("Highlighted Art")
                .child(S.document().schemaType('featuredWorks').documentId('featuredWorks')),
              S.listItem().title("Highlighted Workshop Items")
                .child(S.document().schemaType('highlightedWorkshop').documentId('highlightedWorkshop')),
            ])
        ),
      S.divider(),
    ])

export { structure };