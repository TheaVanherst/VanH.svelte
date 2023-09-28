
import { defineField, defineType } from 'sanity'
import { slugUniqueCheck } from '../../lib/slugUniqueCheck'

import { StarIcon } from '@sanity/icons'

export default defineType({
  name: 'alterCharacter',
  title: 'Alter Characters',
  type: 'document',
  fields: [
    // TODO: User Data

    defineField({
      name: 'fullName', title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'slug', title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'fullName',
        maxLength: 24,
        isUnique: slugUniqueCheck
      }
    }),
    defineField({
      name: 'charIcon', title: 'Character Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'sex', title: 'Sex',
      type: 'reference',
      validation: Rule => Rule.required(),
      to: {type: 'sexTag'}
    }),
    defineField({
      name: 'owner', title: 'characterOwner',
      description: 'Who was this character designed by?',
      type: 'reference',
      to: [{type: 'commissioner'},{type: 'author'}],
    }),
    defineField({
      name: 'fursona', title: 'Fursona',
      description: 'Is this their fursona?',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  icon: StarIcon,
  preview: {
    select: {
      name: 'fullName',
      icon: 'charIcon',
      emoji: 'sex.emoji',
      creator: 'owner.handle'
    },
    prepare(selection) {
      const {name, icon, emoji, creator} = selection

      return {
        title: emoji + " " + name,
        subtitle: "A character created by " + creator,
        media: icon,
      }
    }
  }
});