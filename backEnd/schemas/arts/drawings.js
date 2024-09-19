import { defineField, defineType } from 'sanity'
import { slugUniqueCheck } from '../../lib/slugUniqueCheck'
import { BookIcon, ClipboardImageIcon, ArchiveIcon, ImagesIcon} from '@sanity/icons'

import { authorBlock } from '../chunks/genericBlocks'

export default defineType({
  name: 'artworks',
  title: 'Artworks',
  type: 'document',
  groups: [
    { name: 'PieceData', title: 'Piece Data', default: true,
      icon: ClipboardImageIcon},
    { name: 'archive', title: 'Archive',
      icon: ArchiveIcon},
    { name: 'MetaData', title: 'Metadata',
      icon: BookIcon},
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

    defineField({
      name: 'gallery', title: 'Gallery of Images',
      type: 'blockGallery', group: 'PieceData'
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
      name: 'characters', title: 'Characters',
      type: 'array', group: 'archive',
      of: [{
        type: 'reference',
        to: [{type: 'character'}]
      }],
    }),

    defineField({
      name: 'commissionData',
      title: 'Commission Information',
      type: 'object', group: 'archive',
      fields: [
        defineField({
          name: 'characters', title: 'Characters',
          type: 'array',
          of: [{
            type: 'reference',
            to: [{ type: 'alterCharacter' }]
          }],
        }),
        defineField({
          name: 'artType', title: 'Commission Type',
          type: 'reference',
          to: [{ type: 'commissionType' }]
        }),
      ],
    }),

    defineField({
      name: 'tagData', title: 'Tags',
      description: 'Searchable Tags',
      type: 'array', group: 'archive',
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
      },{
        name: 'cultureTag', type: 'reference',
        to: {type: 'cultureTags'},
      }],
      validation: Rule => Rule.required().unique(),
    }),

    defineField({
      name: 'authors', title: 'Authors',
      type: 'array', group: 'MetaData',
      of: [{
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
            title: 'author.fullName', desc: 'participation.emoji',
            media: 'author.userPortrait'
          },
          prepare: ({title, desc, media}) => {
            return {
              title: `${desc} ${title}`,
              media: media
            }
          }
        },
      }],
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
      initialValue: (new Date()).toISOString(),
    }),
  ],
  icon: ImagesIcon,
  preview: {
    select: {
      title: 'pieceName',
      media: 'gallery.images[0]',
      photoshop: 'discordReferences.photoshopRef',
      archive: 'discordReferences.archiveRef',
      tags: 'tagData.0.title'
    },
    prepare: ({ title, media, photoshop, archive, tags }) => {
      let returnString = `A; ${archive ? '✔️ ' : '❌ '} | P; ${photoshop ? '✔️ ' : '❌ '} | T; ${!!tags ? '✔️ ' : '❌ '}`

      return {
        title: title, subtitle: returnString,
        media: media,
      }
    }
  },
});
