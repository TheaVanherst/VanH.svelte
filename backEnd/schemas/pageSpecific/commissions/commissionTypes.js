
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'commissionTypes',
  type: 'document',
  fields: [
    // TODO: User Data

    defineField({
      name: 'dosList', title: "Do's",
      type: 'object',
      fields: [
        defineField({
          name: 'title', title: "Do's Title",
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'desc', title: "Do's Description",
          type: 'string',
        }),
        defineField({
          name: 'banner',
          title: 'Banner Image',
          type: 'image',
        }),
        defineField({
          name: 'list', title: "Do list",
          type: 'array',
          of: [
            {
              name: 'item',
              title: 'A will do element',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ],
          validation: Rule => Rule.required()
        }),
      ]
    }),
    defineField({
      name: 'dontsList', title: "Dont's",
      type: 'object',
      fields: [
        defineField({
          name: 'title', title: "Dont's Title",
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'desc', title: "Dont's Description",
          type: 'string',
        }),
        defineField({
          name: 'banner',
          title: 'Banner Image',
          type: 'image',
        }),
        defineField({
          name: 'list', title: "Dont list",
          type: 'array',
          of: [
            {
              name: 'item',
              title: 'A will do element',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ],
          validation: Rule => Rule.required()
        }),
      ]
    }),

    defineField({
      name: 'exclusionText', title: 'Exclusion Text',
      type: 'string',
    }),
  ],
})