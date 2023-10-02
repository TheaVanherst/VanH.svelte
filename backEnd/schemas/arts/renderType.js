
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'renderType',
  title: 'Render Type',
  type: 'document',
  fields: [
    defineField({
      name: 'renderName', title: 'Render Type Name',
      description: "What type of render is this?",
      validation: Rule => Rule.required(),
      type: 'string',
    }),
  ],
  preview: {
    select: {
      type: 'renderName',
    },
    prepare: ({ type }) => {
      return {
        title: type
      }
    }
  }
});
