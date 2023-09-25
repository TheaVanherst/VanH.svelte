
import {defineField, defineType} from 'sanity'
import { ClipboardImageIcon }    from '@sanity/icons'

const
  developmentStatus = defineType({
    name: 'developmentStatus', title: 'Development Status',
    type: 'document',
    fields: [
      defineField({
        name: 'statusName', title: 'Status Title',
        type: 'string',
      }),
      defineField({
        name: 'emoji', title: 'Emoji',
        type: 'string',
      }),
      defineField({
        name: 'description', title: 'Description',
        description: 'this will only be shown when filtered',
        type: 'text',
      }),
    ],
    icon: ClipboardImageIcon,
    preview: {
      select: {
        name: 'statusName',
        emoji: 'emoji',
        desc: 'description'
      },
      prepare(selection) {
        const {name, emoji, desc} = selection
        return {
          title: emoji + " " + name ,
          description: desc
        }
      }
    }
  });

export default developmentStatus;