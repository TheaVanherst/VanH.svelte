
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
    { name: 'Archive', title: 'Archive',
      icon: ArchiveIcon },
    { name: 'MetaData', title: 'Metadata',
      icon: BookIcon },
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'releaseDateDesc',
      by: [{field: 'publishedAt', direction: 'desc'}]
    },{
      title: 'Published Date, Old',
      name: 'releaseDateDesc',
      by: [{field: 'publishedAt', direction: 'asc'}]
    }
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

    {
      name: 'fileType', title: 'Gallery or Video',
      description: 'Is the files you wish to upload images or video?',
      type: 'boolean',  group: 'PieceData',
      initialValue: false,
      hidden: ({parent}) => parent?.gallery?.images?.length > 0 || parent?.videoGallery?.length > 0,
    },
    defineField({
      name: 'gallery',      title: 'Gallery of Images',
      type: 'blockGallery', group: 'PieceData',
      hidden: ({parent}) => parent?.fileType
    }),
    defineField({
      name: 'videoGallery',  title: 'Gallery of Videos',
      type: 'array',    group: 'PieceData',
      hidden: ({parent}) => !parent?.fileType,
      of: [
        defineField({
          name: 'videoUrl', title: 'Youtube video URL',
          validation: Rule => Rule.required(),
          type: 'string',
        }),
      ]
    }),


    defineField({
      name: 'characters', title: 'Characters',
      type: 'array', group: 'Archive',
      of: [{
        type: 'reference',
        to: [{type: 'character'}]
      }],
    }),

    defineField({
      name: 'tagData', title: 'Tags',
      description: 'Searchable Tags',
      type: 'array', group: 'Archive',
      of: [{
        name: 'explicitTag', type: 'reference',
        to: {type: 'explicitTags'},
      },{
        name: 'genericTag', type: 'reference',
        to: {type: 'genericTags'},
      },{
        name: 'genreTag', type: 'reference',
        to: {type: 'genreTag'},
      },{
        name: 'designTag', type: 'reference',
        to: {type: 'designTags'},
      },{
        name: 'cultureTag', type: 'reference',
        to: {type: 'cultureTags'},
      }],
      validation: Rule => Rule.required().unique(),
    }),

    defineField({
      name: 'discordReferences',
      title: 'Discord Referencing',
      type: 'object', group: 'MetaData',
      fields: [
        {
          name: 'photoshopRef', title: 'Photoshop Message ID',
          type: 'string',
          hidden: ({parent}) => parent?.TooLarge,
        },
        {
          name: 'TooLarge', title: 'Oversized Photoshop File',
          description: 'Is the file larger than 500mb?',
          type: 'boolean', initialValue: false,
          hidden: ({parent}) => parent?.photoshopRef?.length > 0,
        },
        {
          name: 'archiveRef', title: 'Artchive Message ID',
          type: 'string',
        },
      ],
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
      name: 'imageVisibility', title: 'Image Visibility',
      type: 'object',
      fields: [
        {
          name: 'NSFW', title: 'After Dark Mode',
          description: 'Should we hide this image?',
          type: 'boolean', initialValue: false,
          hidden: ({ parent }) => parent?.SFW
        },{
          name: 'SFW', title: 'Preview Blur',
          description: 'Should we blur this image?',
          type: 'boolean', initialValue: false,
          hidden: ({ parent }) => parent?.NSFW
        }
      ],
      group: 'MetaData',
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
