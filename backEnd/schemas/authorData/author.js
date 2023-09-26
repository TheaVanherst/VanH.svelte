
import {defineField, defineType} from 'sanity'
import {slugUniqueCheck} from '../../lib/slugUniqueCheck'

import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'author',
  title: 'Authors',
  type: 'document',
  fields: [
    // TODO: User Data
    defineField({
      name: 'fullName', title: 'Full Name',
      type: 'string',
    }),
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
        maxLength: 16,
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
          },{
            name: 'visible', title: 'Visibility',
            description: 'Is this item visible on your profile?',
            type: 'boolean',
            initialValue: false,
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
    defineField({
      name: 'profileBanner',
      title: 'Profile Banner',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'shortDesc',
      title: 'Short Description',
      type: 'string',
      validation: Rule => Rule.required().min(4).max(64),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
    }),
    defineField({
      name: 'authorTag', title: 'Tags',
      type: 'array',
      of: [
        { type: 'reference',
          validation: Rule => Rule.required(),
          to: {type: 'authorTags'}},
      ]
    }),
    defineField({
      name: 'internalRole', title: 'Internal Roles',
      type: 'array',
      of: [
        { type: 'reference',
          validation: Rule => Rule.required(),
          to: {type: 'internalTags'}},
      ]
    }),
  ],

  icon: UserIcon,
  preview: {
    select: {
      title: 'fullName',
      shortDesc: 'shortDesc',
      media: 'userPortrait',
      artIcon: 'authorTag.0.emoji',
      intIcon: 'internalRole.0.emoji'
    },
    prepare(selection) {
      const {title, shortDesc, media, artIcon, intIcon} = selection
      return {
        title: `${title} ${artIcon} ${intIcon}`,
        subtitle: shortDesc,
        media: media,
      }
    }
  },
})