
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'highlightedWorkshop',
  title: 'Highlighted Workshop Items',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredWorkshopFull', title: 'Featured Workshop items',
      description: "Workshop items featured on the Homepage",
      type: 'array',
      sortable: true,
      of: [{
        type: 'reference',
        to: [{type: 'workshopItem'}],
      }],
      validation: Rule => Rule.required().min(3).max(6),
    }),
    defineField({
      name: 'featuredWorkshopSnippets', title: 'Featured Workshop snippets',
      description: "Workshop Snippets featured on the Homepage",
      type: 'array',
      sortable: true,
      of: [{
        type: 'reference',
        to: [{type: 'workshopItem'}],
      }],
      validation: Rule => Rule.required().min(8).max(14),
    }),
  ],
  preview: {
    prepare: () => {
      return {
        title: "Highlighted Workshop",
      }
    }
  },
})