import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featuredSocials',
  title: 'Featured Social Media Data',
  type: 'document',
  fields: [
    defineField({
      name: 'socialMedia', title: 'Social Media Links',
      description: "Note - The social media next to your handle is the first to be featured below",
      type: 'array',
      of: [{
        name: 'social', title: 'Social Media',
        type: 'object',
        validation: Rule => Rule.required(),
        fields: [
          defineField({
            name: 'chunkName', title: 'Name of Category',
            type: 'string',
          }),
          defineField({
            name: 'chunkSocials', title: 'Social Media Links',
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
                  name: 'nsfw', title: 'Visibility',
                  description: 'Should this item be visible in NSFW mode?',
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
          })
        ],
        preview: {
          select: {
            chunkName: 'chunkName',
            icon: 'chunkSocials.0.platformName.socialLogo'
          },
          prepare: ({chunkName, icon}) => {
            return {
              title: chunkName,
              media: icon
            }
          }
        },
      }]
    }),
  ],
  preview: {
    prepare: () => {
      return {
        title: "Social Media Groups",
      }
    }
  },
})