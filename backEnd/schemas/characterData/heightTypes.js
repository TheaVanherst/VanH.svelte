
import {defineField, defineType} from 'sanity'
import { NumberIcon }    from '@sanity/icons'

const
  heightTag = defineType({
    name: 'heightTag', title: 'Height Canon Types',
    type: 'document',
    fields: [
      defineField({
        name: 'loreType', title: 'Lore type',
        type: 'string',
      }),
      defineField({
        name: 'description', title: 'Description',
        description: 'this will only be shown when filtered',
        type: 'text',
      }),
    ],
    icon: NumberIcon,
  });

export default heightTag;