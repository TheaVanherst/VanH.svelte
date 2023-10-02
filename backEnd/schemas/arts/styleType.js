
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'styleType',
  title: 'Style Type',
  type: 'document',
  fields: [
    defineField({
      name: 'styleName', title: 'Style Name',
      description: "What type of style is this?",
      validation: Rule => Rule.required(),
      type: 'string',
    }),
    defineField({
      name: 'emoji', title: 'emoji',
      validation: Rule => Rule.required(),
      type: 'string',
    }),
  ],
  preview: {
    select: {
      type: 'styleName',
      emoji: 'emoji'
    },
    prepare: ({ type, emoji }) => {
      return {
        title: emoji + " " + type
      }
    }
  }
});
