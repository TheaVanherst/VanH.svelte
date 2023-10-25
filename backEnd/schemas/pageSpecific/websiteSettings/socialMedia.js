
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'websiteSocials',
  type: 'document',
  fields: [
    // TODO: User Data
    defineField({
      name: 'socialURL', title: 'Social Media URL',
      type: 'string',
    }),
    defineField({
      name: 'socialName', title: 'Platform Name',
      description: "What's the platform's full name?",
      type: 'string',
    }),
    defineField({
      name: 'socialNickname', title: 'Platform Abbrivation',
      description: "What's the shorthand name? Eg. X, FA.",
      type: 'string',
    }),
    defineField({
      name: 'socialDesc', title: 'Description',
      description: 'What do you do on this platform?',
      type: 'text',
    }),
    defineField({
      name: 'socialLogo', title: 'Platform Logo',
      type: 'image',
    }),
  ],
})