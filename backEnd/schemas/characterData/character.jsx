
import { defineField, defineType } from 'sanity'
import { slugUniqueCheck } from '../../lib/slugUniqueCheck'

import { UsersIcon } from '@sanity/icons'

export default defineType({
  name: 'character',
  title: 'Characters',
  type: 'document',
  fields: [
    // TODO: User Data

    defineField({
      name: 'fullName', title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'nickName', title: 'Nickname',
      description: "A shorthand name",
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

    // TODO: Character Imagery

    defineField({
      name: 'charIcon', title: 'Character Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'fullRender', title: 'Portrait',
      description: "A full render of the character.",
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // TODO: Character Information

    defineField({
      name: 'nationality', title: 'Nationality',
      type: 'string',
      validation: Rule => Rule.max(64),
    }),
    defineField({
      name: 'species', title: 'Species',
      type: 'string',
      validation: Rule => Rule.max(64),
    }),
    defineField({
      name: 'timePeriod', title: 'Time Period',
      type: 'string',
      validation: Rule => Rule.max(64),
    }),
    defineField({
      name: 'age', title: 'Age',
      type: 'number',
      validation: Rule => Rule.required().precision(2)
    }),

    // TODO: Sex Information

    defineField({
      name: 'sexuality', title: 'Sexuality',
      type: 'string',
      validation: Rule => Rule.max(32)
    }),
    defineField({
      name: 'sex', title: 'Sex',
      type: 'reference',
      validation: Rule => Rule.required(),
      to: {type: 'sexTag'}
    }),
    defineField({
      name: 'partners', title: 'Partners',
      type: 'array',
      of: [
        { type: 'reference',
          validation: Rule => Rule.required(),
          to: {type: 'character'}}
      ]
    }),

    // TODO: Lore

    defineField({
      name: 'job', title: 'Occupation',
      type: 'string',
      validation: Rule => Rule.required().min(4).max(64),
    }),
    defineField({
      name: 'desc', title: 'Bio',
      type: 'text',
    }),
    defineField({
      name: 'biography', title: 'Lore',
      type: 'blockContent',
    }),
    defineField({
      name: 'NSFW',     title: 'NSFW Character',
      type: 'boolean',
      initialValue: false,
      description: 'Should this character be filtered out?',
    }),

    // TODO: Character Creation

    defineField({
      name: 'creation', title: 'Creation',
      type: 'date',
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
      ]
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
              to: {type: 'heightTag'}
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
            prepare(selection) {
              const {title, minHeight, maxHeight} = selection
              return {title: `${title} - ${maxHeight ? 'Minimum' : ''} Height: ${minHeight}cm ${maxHeight ? "- " + maxHeight + 'cm' : ''}`}
            }
          }
        }),
      ],
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
    prepare(selection) {
      const {title, age, job, media} = selection

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