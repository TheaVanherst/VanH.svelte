
import {defineField, defineType} from 'sanity'

import { StackCompactIcon } from '@sanity/icons'

export default defineType({
  name: 'workshopSnippet',
  title: 'Embedded Snippet',
  type: 'document',
  fields: [
    // TODO: User Data
    defineField({
      name: 'itemName', title: 'Embedded Item Name',
      type: 'string',
      validation: Rule => Rule.required()
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
      name: 'gameTags', title: 'Game',
      type: 'reference',
      validation: Rule => Rule.required(),
      to: { type: 'gameTag' }
    }),
    defineField({
      name: 'author', title: 'Author',
      type: 'array',
      of: [
        {
          type: 'reference',
          validation: Rule => Rule.required(),
          to: { type: 'author' }
        }
      ]
    }),
    defineField({
      name: 'NSFW',     title: 'NSFW Toggle',
      type: 'boolean',
      initialValue: false,
      description: 'Should this item be hidden?',
    }),
  ],

  icon: StackCompactIcon,
  preview: {
    select: {
      title: 'itemName',
      shortDesc: 'shortDesc',
      media: 'previewImage'
    },
    prepare: ({ title, shortDesc, media }) => {
      return {
        title: title,
        subtitle: shortDesc,
        media: media,
      }
    }
  },
})