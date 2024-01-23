
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
      type: 'object', group: 'about',
      fields: [
        {
          name: 'years', title: 'Years',
          type: 'number',
          validation: Rule => Rule.positive().precision(2),
        },{
          name: 'measurement', title: 'Max height',
          description: 'Measurement type',
          type: 'string', initialValue: 'years',
          options: {
            list: [
              { title: 'years',     value: "" },
              { title: 'thousand',  value: "thousand" },
              { title: 'million',   value: "million" },
              { title: 'billion',   value: "billion" },
              { title: 'trillion',  value: "trillion" },
            ],
          },
          hidden: ({ parent }) => parent?.years
        },
      ],
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
              name: 'lowestHeight', title: 'Lowest height',
              type: 'object',
              fields: [
                {
                  name: 'height', title: 'Height Range',
                  type: 'number',
                  validation: Rule => Rule.positive().precision(2),
                },{
                  name: 'measurement', title: 'Max height',
                  type: 'string', initialValue: 'cm',
                  options: {
                    list: [
                      { title: 'Cm',          value: "cm" },
                      { title: 'Feet',        value: "ft" },
                      { title: 'Metres',      value: "m" },
                      { title: 'Kilometres',  value: "km" },
                      { title: 'Miles',       value: "miles" },
                      { title: 'Megametres',  value: "Mm" },
                      { title: 'Gigametres',  value: "Gm" },
                      { title: 'Terametres',  value: "Tm" },
                      { title: 'Light years', value: "Ly" }
                    ]},
                  hidden: ({ parent }) => parent?.height
                }],
            }),
            defineField({
              name: 'maxHeight', title: 'Max height',
              type: 'object',
              fields: [
                {
                  name: 'height', title: 'Height Range',
                  type: 'number',
                  validation: Rule => Rule.positive().precision(2),
                },{
                  name: 'measurement', title: 'Max height',
                  type: 'string', initialValue: 'cm',
                  options: {
                    list: [
                      { title: 'Cm',          value: "cm" },
                      { title: 'Feet',        value: "ft" },
                      { title: 'Metres',      value: "m" },
                      { title: 'Kilometres',  value: "km" },
                      { title: 'Miles',       value: "miles" },
                      { title: 'Megametres',  value: "Mm" },
                      { title: 'Gigametres',  value: "Gm" },
                      { title: 'Terametres',  value: "Tm" },
                      { title: 'Light years', value: "Ly" }
                    ]},
                  hidden: ({ parent }) => parent?.height
                }],
              hidden: ({ parent }) => parent?.lowestHeight?.height
            }),

          ],
          preview: {
            select: {
              title: 'loreType.loreType',
              minHeight: 'lowestHeight.height',
              minType: 'lowestHeight.measurement',
              maxHeight: 'maxHeight.height',
              maxType: 'maxHeight.measurement'
            },
            prepare: ({ title, minHeight, minType, maxHeight, maxType }) => {
              return {
                title: `${title} - ${maxHeight ? 'Minimum' : ''} Height: ${minHeight}${minType} ${maxHeight ? "- " + maxHeight + maxType : ''}`
              }}
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
      age: 'age.years',
      ageMeasurement: 'age.measurement',
      media: 'charIcon'
    },
    prepare: ({ title, age, job, media, ageMeasurement }) => {
      return {
        title: `${title}`,
        subtitle: age + ' ' + ageMeasurement + ' y/o , ' + job + ' ',
        media: media,
      }
    }
  }
});