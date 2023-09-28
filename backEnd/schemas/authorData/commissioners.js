
import {defineField, defineType} from 'sanity'
import {slugUniqueCheck} from '../../lib/slugUniqueCheck'

import { StarIcon } from '@sanity/icons'

export default defineType({
  name: 'commissioner',
  title: 'Commissioner',
  type: 'document',
  fields: [
    // TODO: User Data
    defineField({
      name: 'handle', title: 'Handle',
      description: "A shorthand onsite username",
      type: 'string',
    }),
    defineField({
      name: 'slug', title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'handle',
        maxLength: 24,
        isUnique: slugUniqueCheck
      }
    }),
    defineField({
      name: 'socialMedia', title: 'Social Media Links',
      description: "Note - The social media next to your handle is the first to be featured below",
      type: 'array',
      of: [{
        name: 'social', title: 'Social Media',
        type: 'object',
        validation: Rule => Rule.required(),
        fields: [
          {
            name: 'platformName',  title: 'Platform Name',
            type: 'reference',
            to: {type: 'websiteSocials'},
            validation: Rule => Rule.required()
          },{
            name: 'url',  title: 'Profile Handle',
            description: 'Your profile URL, minus the string to the profile directory.',
            type: 'string', validation: Rule => Rule.required()
          }
        ],
        preview: {
          select: {
            userURL: 'url',
            socialURL: 'platformName.socialURL',
            media: 'platformName.socialLogo',
          },
          prepare(selection) {
            const { userURL, socialURL, media, test } = selection
            return {
              title: 'www.' + socialURL + userURL,
              description: test,
              media: media,
            }
          }
        },
      }],
    }),
    defineField({
      name: 'userPortrait',
      title: 'User Portrait',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],

  icon: StarIcon,
  preview: {
    select: {
      title: 'handle',
      shortDesc: 'shortDesc',
      media: 'userPortrait',
    },
    prepare(selection) {
      const {title, shortDesc, media} = selection
      return {
        title: `${title}`,
        subtitle: shortDesc,
        media: media,
      }
    }
  },
})