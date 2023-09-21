
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'commissionTypes',
  type: 'document',
  fields: [
    // TODO: User Data
    defineField({
      name: 'willDo', title: 'Do List',
      type: 'array',
      of: [
        defineField({
          name: 'dos', title: 'Dos',
          type: 'string',
        }),
      ]
    }),
    defineField({
      name: 'willDonts', title: 'Dont List',
      type: 'array',
      of: [
        defineField({
          name: 'prevIter',
          type: 'object',
          fields: [
            defineField({
              name: 'donts', title: 'Donts',
              type: 'string',
            }),
            defineField({
              name: 'maybes', title: 'Maybes',
              type: 'boolean',
              initialValue: false,
              description: 'Do you not really want to do this?',
            }),
          ],
          preview: {
            select: {
              title: 'donts',
              icon: 'maybes'
            },
            prepare(selection) {
              const {title, icon } = selection
              return {
                title: (icon ? "🔴" : "🟢") + " " + title,
              }
            }
          },
        }),
      ]
    }),
    defineField({
      name: 'exclusionText', title: 'Exclusion Text',
      type: 'string',
    }),
  ],
})