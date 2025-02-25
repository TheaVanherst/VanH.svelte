
import {defineField, defineType} from 'sanity'
import {slugUniqueCheck} from '../../lib/slugUniqueCheck'

import { SquareIcon} from '@sanity/icons'

export default defineType({
  name: 'workshopItem',
  title: 'Workshop Item',
  type: 'document',
  fields: [
    // TODO: User Data
    defineField({
      name: 'itemName', title: 'Embedded Item Name',
      type: 'string',
    }),
    defineField({
      name: 'slug', title: 'Slug',
      type: 'slug',
      options: {
        source: 'itemName',
        maxLength: 16,
        isUnique: slugUniqueCheck
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Embedded ID',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
    }),
    defineField({
      name: 'workshopBanner',
      title: 'workshop Banner',
      type: 'image',
    }),
    defineField({
      name: 'shortDesc',
      title: 'Short Description',
      type: 'string',
      validation: Rule => Rule.required().min(4).max(128),
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'gameTags', title: 'Game',
      type: 'reference',
      validation: Rule => Rule.required(),
      to: { type: 'gameTag' }
    }),
    defineField({
      name: 'characters', title: 'Characters',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'character'}]
      }],
    }),
    defineField({
      name: 'author', title: 'Author',
      type: 'array',
      of: [{
        type: 'reference',
        validation: Rule => Rule.required(),
        to: { type: 'author' }}]
    }),
    defineField({
      name: 'publishedAt', title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required(),
      initialValue: (new Date()).toISOString(),
    }),
    defineField({
      name: 'NSFW', title: 'After Dark Mode',
      description: 'Should we hide this image?',
      type: 'boolean', initialValue: false,
      hidden: ({ parent }) => parent?.SFW
    }),
  ],

  icon: SquareIcon,
  preview: {
    select: {
      title: 'itemName',
      shortDesc: 'shortDesc',
      media: 'previewImage',
      nsfw: 'NSFW'
    },
    prepare: ({ title, shortDesc, media, nsfw }) => {
      return {
        title: title,
        subtitle: `${nsfw ? '🔞' : ''} ${shortDesc}`,
        media: media,
      }
    }
  },
})