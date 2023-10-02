
import {defineField, defineType} from 'sanity'
import { TagIcon }    from '@sanity/icons'

const
  artCategories = defineType({
    name: 'gameTag', title: 'Game Selection',
    type: 'document',
    fields: [
      defineField({
        name: 'gameName', title: 'Game Name',
        type: 'string',
      }),
      defineField({
        name: 'gameLogo', title: 'Game Logo',
        type: 'image',
      }),
    ],
    icon: TagIcon,
    preview: {
      select: {
        title: 'gameName',
        media: 'gameLogo'
      },
      prepare: ({ title, media }) => {
        return {
          title: title,
          media: media,
        }
      }
    }
  });

export default artCategories;
