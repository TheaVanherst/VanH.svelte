import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'characterOrder',
  title: 'Character order',
  type: 'document',
  fields: [
    defineField({
      name: 'characters', title: 'Characters',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'character'}],
      }],
      options: {
        disableNew: true,
      }
    }),
  ]
});