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
          type: 'object',
          fields: [
            defineField({
              name: 'tierName', title: 'Donation Tier Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'tierDesc', title: 'Donation Description',
              type: 'string',
              validation: Rule => Rule.required()
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
          ]
        }),
      ]
    }),
    defineField({
      name: 'globalTiers', title: 'Global Benefits',
      type: 'object',
      fields: [
        defineField({
          name: 'tierName', title: 'Donation Tier Name',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'tierDesc', title: 'Donation Description',
          type: 'string',
          validation: Rule => Rule.required()
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
      ]
    }),
    defineField({
      name: 'personalMessage', title: 'Personalised Donation Message',
      type: 'text',
    }),
  ],
})