
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'questionAnswer',
  type: 'document',
  fields: [
    // TODO: User Data
    defineField({
      name: 'questions', title: 'Questions',
      type: 'array',
      of: [
        defineField({
          name: 'prevIter',
          type: 'object',
          fields: [
            defineField({
              name: 'question', title: 'Question',
              type: 'string',
            }),
            defineField({
              name: 'answer', title: 'Answer',
              type: 'text',
              rows: 4
            }),
            defineField({
              name: 'author', title: 'Author',
              type: 'reference',
              to: { type: 'author' }
            }),
          ],
          preview: {
            select: {
              title: 'question'
            },
            prepare(selection) {
              const {title } = selection
              return {
                title: title
              }
            }
          },
        }),
      ]
    }),
    defineField({
      name: 'answerer', title: 'Answerer',
      type: 'reference',
      to: {type: 'author'}
    }),
    defineField({
      name: 'fallback', title: 'Anon',
      type: 'reference',
      to: {type: 'author'}
    }),
  ],
})