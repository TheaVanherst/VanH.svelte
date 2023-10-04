
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'additionalPurchases',
  title: 'Additional Purchases',
  type: 'document',
  fields: [
    defineField({
      name: 'purchaseName', title: 'Purchasable Name',
      description: "What type of purchase is this?",
      validation: Rule => Rule.required(),
      type: 'string',
    }),
    defineField({
      name: 'additionalDescription', title: 'Additional Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      type: 'purchaseName',
    },
    prepare: ({ type }) => {
      return { title: type }
    }
  }
});
