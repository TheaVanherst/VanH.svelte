
import {defineField, defineType} from 'sanity'
import { TagIcon }    from '@sanity/icons'

const
  sexTag = defineType({
    name: 'sexTag', title: 'Sex Tags',
    type: 'document',
    fields: [
      defineField({
        name: 'emoji', title: 'emoji',
        type: 'string',
      }),
      defineField({
        name: 'description', title: 'Description',
        description: 'this will only be shown when filtered',
        type: 'text',
      }),
    ],
    icon: TagIcon,
  });

export default sexTag;