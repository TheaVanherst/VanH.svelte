
import { defineField, defineType } from 'sanity'
import { slugUniqueCheck } from '../../lib/slugUniqueCheck'
import {ArchiveIcon, BookIcon, ClipboardImageIcon, ImageIcon} from '@sanity/icons'

import { nsfwBlock, authorBlock } from '../chunks/genericBlocks'

export default defineType({
  name: 'alternateArts',
  title: 'Design & Media',
  type: 'document',
  groups: [
    { name: 'PieceData', title: 'Piece Data', default: true,
      icon: ClipboardImageIcon },
    { name: 'MetaData', title: 'Archive / Metadata',
      icon: ArchiveIcon },
  ],
  fields: [
    // TODO: User Data
    defineField({
      name: 'pieceName', title: 'Artwork Piece Name',
      description: 'what is the name of the artwork piece?',
      type: 'string', group: 'PieceData',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description', title: 'Description',
      description: 'give a short description of the piece(s)',
      type: 'text', group: 'PieceData',
      rows: 3,
    }),

    defineField({
      name: 'slug', title: 'Slug',
      type: 'slug', group: 'MetaData',
      options: {
        source: 'pieceName',
        maxLength: 24,
        isUnique: slugUniqueCheck,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'gallery', title: 'Gallery of Images',
      type: 'blockGallery', group: 'PieceData'
    }),

    defineField({
      name: 'tagData', title: 'Tags',
      description: 'Searchable Tags',
      type: 'array', group: 'MetaData',
      of: [{
        name: 'nsfwTag', type: 'reference',
        to: {type: 'nsfwTags'},
      },{
        name: 'explicitTag', type: 'reference',
        to: {type: 'explicitTags'},
      },{
        name: 'genericTag', type: 'reference',
        to: {type: 'genericTags'},
      },{
        name: 'genreTag', type: 'reference',
        to: {type: 'genreTag'},
      }],
      validation: Rule => Rule.required().unique(),
    }),

    defineField({
      name: 'authors', title: 'Authors',
      type: 'array', group: 'MetaData',
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
              to: { type: 'authorTags' }
            }
          ],
          preview: {
            select: {
              title: 'author.fullName',
              desc: 'participation.emoji',
              media: 'author.userPortrait'
            },
            prepare: ({title, desc, media}) => {
              return {
                title: `${desc} ${title}`,
                media: media
              }
            }
          },
        },
      ],
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'NSFW', title: 'Preview Blur',
      description: 'Should we blur this image?',
      type: 'boolean', group: 'MetaData',
      initialValue: false,
    }),

    defineField({
      name: 'publishedAt', title: 'Published at',
      type: 'datetime', group: 'MetaData',
      validation: Rule => Rule.required(),
      initialValue: (new Date()).toISOString()
    }),
  ],
  icon: ImageIcon,
  preview: {
    select: {
      title: 'pieceName',
      author1: 'authors.0.author.fullName',
      author2: 'authors.1.author.fullName',
      author3: 'authors.2.author.fullName',
      author4: 'authors.3.author.fullName',
      media: 'gallery.images[0]',
    },
    prepare: ({ title, author1, author2, author3, author4, media, }) => {
      let returnString = "";

      returnString += "Created by ";

      const authors = [author1, author2, author3, author4].filter(Boolean);

      for (let i = 0; i < authors.length; i++) {
        returnString += authors[i] + (i < authors.length - 1 ? ", " : " ");}

      return {
        title: title,
        subtitle: returnString,
        media: media,
      }
    }
  },
});
