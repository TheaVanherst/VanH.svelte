
import {defineField, defineType} from 'sanity'
import {slugUniqueCheck} from '../../lib/slugUniqueCheck'

import { SquareIcon} from '@sanity/icons'

export default defineType({
  name: 'workshopItem',
  title: 'Embedded Item',
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
      validation: Rule => Rule.required(),
      options: {
        source: 'handle',
        maxLength: 16,
        isUnique: slugUniqueCheck
      }
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
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'workshopBanner',
      title: 'workshop Banner',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      to: {type: 'gameTag'}
    }),
    defineField({
      name: 'author', title: 'Author',
      type: 'array',
      of: [
          {
            type: 'reference',
            validation: Rule => Rule.required(),
            to: {type: 'author'}
          }
        ]
    }),
    defineField({
      name: 'featured',     title: 'Featured Toggle',
      type: 'boolean',
      initialValue: false,
      description: 'Should this item be featured?',
    }),
  ],

  icon: SquareIcon,
  preview: {
    select: {
      title: 'itemName',
      shortDesc: 'shortDesc',
      media: 'previewImage',
      featured: 'featured'
    },
    prepare(selection) {
      const {title, shortDesc, media, featured} = selection
      return {
        title: (featured ? '⚪' : '🔴') + ' ' + title,
        subtitle: shortDesc,
        media: media,
      }
    }
  },
})