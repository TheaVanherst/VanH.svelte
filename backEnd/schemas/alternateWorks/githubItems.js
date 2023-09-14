
import {defineField, defineType} from 'sanity'
import {slugUniqueCheck} from '../../lib/slugUniqueCheck'

import { TerminalIcon } from '@sanity/icons'

export default defineType({
  name: 'githubItem',
  title: 'Github Items',
  type: 'document',
  fields: [
    // TODO: User Data
    defineField({
      name: 'itemName', title: 'Github Item Name',
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
      title: 'Github Url',
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
      name: 'accentColour',
      title: 'Accent Colour',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(10),
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
  ],

  icon: TerminalIcon,
  preview: {
    select: {
      title: 'itemName',
      shortDesc: 'shortDesc',
      media: 'previewImage'
    },
    prepare(selection) {
      const { title, shortDesc, media } = selection
      return {
        title: title,
        subtitle: shortDesc,
        media: media,
      }
    }
  },
})