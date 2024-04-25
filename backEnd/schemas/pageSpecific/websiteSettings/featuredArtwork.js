
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'featuredWorks',
  title: 'Highlighted Artworks',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredArtworks', title: 'Featured works',
      description: "Artwork latest at the top of the 'Featured' page.",
      type: 'array',
      sortable: true,
      of: [{
        type: 'reference',
        to: [{type: 'artworks'},{type:'alternateArts'}],
      }],
      validation: Rule => Rule.required().min(3).max(10),
    })
  ],
  preview: {
    prepare: () => {
      return {
        title: "Highlighted artworks",
      }
    }
  },
})