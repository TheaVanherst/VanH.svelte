
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'commissionType',
  title: 'Commission Type',
  type: 'document',
  fields: [
    defineField({
      name: 'typeName', title: 'Commission Type Name',
      description: "What type of art piece is this?",
      validation: Rule => Rule.required(),
      type: 'string',
    }),
    defineField({
      name: 'preName', title: 'how to define the commission beforehand',
      description: "Eg. 'A', 'An'",
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
      type: 'typeName',
      emoji: 'emoji'
    },
    prepare(selection) {
      const {type, emoji} = selection
      return {
        title: emoji + " " + type
      }
    }
  }
});
