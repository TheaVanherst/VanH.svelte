
import {defineField, defineType} from 'sanity'

import { StackCompactIcon } from '@sanity/icons'

export default defineType({
  name: 'donationTier',
  title: 'Donation Tiers',
  type: 'document',
  fields: [
    // TODO: User Data
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
      name: 'featured',     title: 'Featured Bool',
      type: 'boolean',
      initialValue: false,
      description: 'Is this the global donation perk?',
    }),
  ],

  icon: StackCompactIcon,
  preview: {
    select: {
      title: 'tierName',
      shortDesc: 'tierDesc',
      media: 'bannerImage'
    },
    prepare(selection) {
      const {title, shortDesc, media} = selection
      return {
        title: title,
        subtitle: shortDesc,
        media: media,
      }
    }
  },
})