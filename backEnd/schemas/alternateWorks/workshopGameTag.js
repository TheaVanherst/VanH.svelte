
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
        options: {
          hotspot: true,
        },
      }),
    ],
    icon: TagIcon,
    preview: {
      select: {
        title: 'gameName',
        media: 'gameLogo'
      },
      prepare(selection) {
        const {title, media} = selection
        return {
          title: title,
          media: media,
        }
      }
    }
  });

export default artCategories;
