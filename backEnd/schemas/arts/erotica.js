import { defineField, defineType } from 'sanity'
import { slugUniqueCheck } from '../../lib/slugUniqueCheck'
import { BookIcon, ClipboardImageIcon, ArchiveIcon, InlineIcon} from '@sanity/icons'

import { authorBlock } from '../chunks/genericBlocks'

export default defineType({
  name: 'erotica', title: 'Erotica',
  type: 'document',
  groups: [
    { name: 'PieceData', title: 'Piece Data', default: true,
      icon: ClipboardImageIcon},
    { name: 'archive', title: 'Archive',
      icon: ArchiveIcon},
    { name: 'MetaData', title: 'Metadata',
      icon: BookIcon},
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
      name: 'image',  title: 'Banner image',
      description: 'Recommended size of a 1500 x 500 pixel image.',
      type: 'image', group: 'PieceData',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'story', title: 'Story',
      description: 'give a short description of the piece(s)',
      type: 'blockContent', group: 'PieceData',
      rows: 20,
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'characters', title: 'Characters',
      type: 'array', group: 'archive',
      of: [{
        type: 'reference',
        to: [{
          type: 'character'
        },{
          type: 'alterCharacter',
        }]
      }],
      validation: Rule => Rule.required().unique(),
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
      name: 'publishedAt', title: 'Published at',
      type: 'datetime', group: 'MetaData',
      validation: Rule => Rule.required(),
      initialValue: (new Date()).toISOString(),
    }),
  ],
  icon: InlineIcon,
  preview: {
    select: {
      title: 'pieceName',
      desc: 'description',
      media: 'image'
    },
    prepare: ({ title, desc, media }) => {
      return {
        title: title, subtitle: desc,
        media: media,
      }
    }
  },
});
