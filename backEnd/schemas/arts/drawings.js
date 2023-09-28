import {defineField, defineType} from 'sanity'
import {slugUniqueCheck} from '../../lib/slugUniqueCheck'
import {ImageIcon} from '@sanity/icons'

import { nsfwBlock, authorBlock } from '../chunks/genericBlocks'

export default defineType({
  name: 'artworks',
  title: 'Artworks',
  type: 'document',
  fields: [
    // TODO: User Data
    defineField({
      name: 'pieceName', title: 'Artwork Piece Name',
      description: 'what is the name of the artwork piece?',
      type: 'string',
    }),
    defineField({
      name: 'description', title: 'Description',
      description: 'give a short description of the piece(s)',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'slug', title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'pieceName',
        maxLength: 24,
        isUnique: slugUniqueCheck,
      }
    }),

    defineField({
      name: 'gallery', title: 'Gallery of Images',
      validation: Rule => Rule.required(),
      type: 'blockGallery'
    }),

    defineField({
      name: 'characters', title: 'Characters',
      type: 'array',
      of: [
        { type: 'reference',
          to: [{type: 'character'}]},
      ],
    }),

    defineField({
      name: 'commissionData',
      title: 'Commission Information',
      type: 'object',
      fields: [
        defineField({
          name: 'characters', title: 'Characters',
          type: 'array',
          of: [
            { type: 'reference',
              to: [{type: 'alterCharacter'}]},
          ],
        }),

        defineField({
          name: 'artType', title: 'Commission Type',
          type: 'reference',
          to: [{type: 'commissionType'}],
        }),
      ]
    }),

    defineField({
      name: 'authors', title: 'Authors',
      type: 'array',
      of: [
        {
          name: 'object',
          validation: Rule => Rule.required(),
          type: 'object',
          fields: [
            authorBlock,
            {
              name: 'participation', title: 'Participation',
              validation: Rule => Rule.required(),
              type: 'reference',
              to: {
                type: 'authorTags'
              }
            }
          ],
          preview: {
            select: {
              title: 'author.fullName',
              desc: 'participation.emoji',
              media: 'author.userPortrait'
            },
            prepare(selection) {
              const {title, desc, media} = selection
              return {
                title: `${desc} ${title}`,
                media: media
              }
            }
          },
        },
      ],
    }),

    nsfwBlock,

    defineField({
      name: 'publishedAt', title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required(),
      initialValue: (new Date()).toISOString()
    }),
  ],
  icon: ImageIcon,
  preview: {
    select: {
      title: 'pieceName',
      author1: 'authors.0.author.fullName',
      author1Icon: 'authors.0.participation.emoji',
      author2: 'authors.1.author.fullName',
      author2Icon: 'authors.1.participation.emoji',
      author3: 'authors.2.author.fullName',
      author3Icon: 'authors.2.participation.emoji',
      author4: 'authors.3.author.fullName',
      author4Icon: 'authors.3.participation.emoji',
      media: 'gallery.images[0]',
    },
    prepare(selection) {
      const {title, author1, author1Icon, author2, author2Icon, author3, author3Icon, author4, author4Icon, media} = selection
      let returnString = "";

      const
        authors = [author1, author2, author3, author4].filter(Boolean),
        icons = [author1Icon, author2Icon, author3Icon, author4Icon];

      for (let i = 0; i < authors.length; i++) {
        returnString += icons[i] + " " + authors[i] + (i < authors.length - 1 ? ", " : "");}

      return {
        title: title,
        subtitle: returnString,
        media: media,
      }
    }
  },
})