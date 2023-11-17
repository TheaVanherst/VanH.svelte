
import { defineField, defineType } from 'sanity'
import { EyeOpenIcon } from '@sanity/icons'

const
  internalTags = defineType({
    name: 'genericTags', title: 'Generic Content Tags',
    type: 'document',
    fields: [
      defineField({
        name: 'title', title: 'Title', type: 'string'}),
      defineField({
        name: 'relatedTags', title: 'Related Tags',
        description: 'Alternate tags in relation to the focus tag (Seperated by spaces)',
        type: 'text', rows: 3,
      })],
    icon: EyeOpenIcon,
    preview: {
      select: {title: 'title', desc: 'description'},
      prepare: ({title, desc}) => {
        return {title: `${title}`, subtitle: desc}}}
  });

export default internalTags;