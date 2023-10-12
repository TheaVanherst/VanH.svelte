import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'donationData',
  title: 'Donation Data',
  type: 'document',
  fields: [
    defineField({
      name: 'tiers', title: 'Tiers',
      type: 'array',
      of: [
        defineField({
          name: 'tier', title: 'Tier',
          description: 'Donation tiers / types',
          type: 'object',
          fields: [
            defineField({
              name: 'tierName', title: 'Donation Tier Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'tierEmoji', title: 'Donation Tier Emoji',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'tierDesc', title: 'Donation Description',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'tierCost', title: 'Donation Costs',
              type: 'object',
              fields: [
                defineField({
                  name: 'price', title: 'Price',
                  type: 'number',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'additional', title: 'Is this a cost that could be greater?',
                  type: 'boolean',
                  initialValue: false
                }),
                defineField({
                  name: 'recurring', title: 'Is this a recurring cost?',
                  type: 'boolean',
                  initialValue: false
                }),
              ]
            }),
            defineField({
              name: 'tierRedirect',
              title: 'Tier Redirect URL',
              type: 'string',
            }),
            defineField({
              name: 'bannerImage',
              title: 'Banner Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'tierPerks', title: 'Tier Perks',
              type: 'array',
              of: [
                {
                  name: 'tierRedirect',
                  title: 'Tier Redirect URL',
                  type: 'string',
                  validation: Rule => Rule.required()
                }
              ],
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'boldFirst', title: 'Should the first perk be bolded?',
              type: 'boolean',
              initialValue: false
            }),
          ]
        }),
      ]
    }),
    defineField({
      name: 'personalMessage', title: 'Personalised Donation Message',
      type: 'text',
    }),
  ],
})