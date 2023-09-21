
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'commissionData',
  type: 'document',
  fields: [
    // TODO: User Data
    defineField({
      name: 'notices', title: 'Notices',
      type: 'text',
    }),
    defineField({
      name: 'howToComm', title: 'How to commission',
      type: 'text',
    }),
    defineField({
      name: 'benefitList', title: 'Benefits List',
      type: 'array',
      of: [
        defineField({
          name: 'benefit', title: 'Benefit',
          type: 'text',
          rows: 3
        }),
      ]
    }),
    defineField({
      name: 'termsAndConditions', title: 'Terms & Conditions',
      type: 'array',
      of: [
        defineField({
          name: 'term', title: 'term',
          type: 'text',
          rows: 4,
        }),
      ]
    }),
  ],
})