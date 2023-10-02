
import { defineField, defineType } from 'sanity'
import { slugUniqueCheck } from '../../lib/slugUniqueCheck'

import { UsersIcon, DocumentsIcon, ClipboardImageIcon, BookIcon, ArchiveIcon } from '@sanity/icons'

export default defineType({
  name: 'character',
  title: 'Characters',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profile',
      default: true, // optional, defaults to false
      icon: ClipboardImageIcon},
    { name: 'about', title: 'About',
      icon: DocumentsIcon},
    { name: 'lore', title: 'Lore',
      icon: BookIcon},
    { name: 'development', title: 'Development',
      icon: ArchiveIcon},
  ],
  fields: [
    // TODO: User Data
    defineField({
      name: 'fullName', title: 'Full Name',
      type: 'string',
      group: 'profile'
    }),
    defineField({
      name: 'nickName', title: 'Nickname',
      description: "A shorthand name",
      type: 'string',
      group: 'profile'
    }),
    defineField({
      name: 'slug', title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'nickName',
        maxLength: 16,
        isUnique: slugUniqueCheck
      },
      group: 'profile'
    }),

    // TODO: Character Imagery
    defineField({
      name: 'charIcon', title: 'Character Icon',
      type: 'image',
      group: 'profile'
    }),
    defineField({
      name: 'fullRender', title: 'Portrait',
      description: "A full render of the character.",
      type: 'image',
      group: 'profile'
    }),

    // TODO: Character Information
    defineField({
      name: 'nationality', title: 'Nationality',
      type: 'string',
      validation: Rule => Rule.max(64),
      group: 'lore'
    }),
    defineField({
      name: 'species', title: 'Species',
      type: 'string',
      validation: Rule => Rule.max(64),
      group: 'lore'
    }),
    defineField({
      name: 'timePeriod', title: 'Time Period',
      type: 'string',
      validation: Rule => Rule.max(64),
      group: 'lore'
    }),

    // TODO: Sex Information
    defineField({
      name: 'sexuality', title: 'Sexuality',
      type: 'string',
      validation: Rule => Rule.max(32),
      group: 'about'
    }),
    defineField({
      name: 'sex', title: 'Sex',
      type: 'reference',
      validation: Rule => Rule.required(),
      to: {type: 'sexTag'},
      group: 'about'
    }),
    defineField({
      name: 'age', title: 'Age',
      type: 'number',
      validation: Rule => Rule.required().precision(2),
      group: 'about'
    }),
    defineField({
      name: 'birthday', title: 'Birthday',
      type: 'date',
      group: 'about'
    }),
    defineField({
      name: 'partners', title: 'Partners',
      type: 'array',
      of: [
        { type: 'reference',
          validation: Rule => Rule.required(),
          to: { type: 'character' }}
      ],
      group: 'about'
    }),

    // TODO: Lore

    defineField({
      name: 'job', title: 'Occupation',
      type: 'string',
      validation: Rule => Rule.required().min(4).max(64),
      group: 'lore'
    }),
    defineField({
      name: 'desc', title: 'Bio',
      type: 'text',
      group: 'lore'
    }),
    defineField({
      name: 'biography', title: 'Lore',
      type: 'blockContent',
      group: 'lore'
    }),
    defineField({
      name: 'NSFW',     title: 'NSFW Character',
      type: 'boolean',
      initialValue: false,
      description: 'Should this character be filtered out?',
      group: 'development'
    }),

    // TODO: Character Creation

    defineField({
      name: 'developmentStatus', title: 'Development Status',
      type: 'reference',
      validation: Rule => Rule.required(),
      to: { type: 'developmentStatus' },
      group: 'development'
    }),

    defineField({
      name: 'creation', title: 'Creation',
      type: 'date',
      group: 'development'
    }),
    defineField({
      name: 'prevcreation', title: 'Previous Iterations',
      type: 'array',
      of: [
        defineField({
          name: 'prevIter',
          type: 'object',
          fields: [
            defineField({
              name: 'creation', title: 'Creation Date',
              validation: Rule => Rule.required(),
              type: 'date',
            }),
            defineField({
              name: 'scrapped', title: 'Scrapped Date',
              type: 'date',
            }),
          ]
        })
      ],
      group: 'development'
    }),

    // TODO: Height Data

    defineField({
      name: 'heights', title: 'Heights',
      type: 'array',
      of: [
        defineField({
          name: 'height', title: 'Height Lore Of...',
          type: 'object',
          fields: [
            defineField({
              name: 'loreType', title: 'Lore Type',
              type: 'reference',
              validation: Rule => Rule.required(),
              to: { type: 'heightTag' }
            }),
            defineField({
              name: 'canonHeightLow', title: 'Lowest height',
              description: 'The Lowest range / default height of the character in cm.',
              type: 'number',
              validation: Rule => Rule.required().positive().precision(2),
            }),
            defineField({
              name: 'canonHeightHigh', title: 'Max Height Range',
              description: 'The maximum height of the character (if applicable) in cm.',
              type: 'number',
              validation: Rule => Rule.integer().positive().precision(2),
            }),
          ],
          preview: {
            select: {
              title: 'loreType.loreType',
              minHeight: 'canonHeightLow',
              maxHeight: 'canonHeightHigh',
            },
            prepare: ({ title, minHeight, maxHeight }) => {
              return {
                title: `${title} - ${maxHeight ? 'Minimum' : ''} Height: ${minHeight}cm ${maxHeight ? "- " + maxHeight + 'cm' : ''}`
              }
            }
          }
        }),
      ],
      group: 'about'
    }),
  ],

  icon: UsersIcon,
  preview: {
    select: {
      title: 'fullName',
      job: 'job',
      age: 'age',
      media: 'charIcon'
    },
    prepare: ({ title, age, job, media }) => {

      let trueAge = undefined;
      if (age - Math.floor(age) !== 0){
        let naughtGen = (age + "").split(".");
        trueAge = naughtGen[0].toString().padEnd(naughtGen[1], "0");
        trueAge = Math.floor(trueAge) ;
      }

      return {
        title: `${title}`,
        subtitle: (trueAge ? trueAge.toLocaleString("en-US") : age) + 'y/o , ' + job + ' ',
        media: media,
      }
    }
  }
});