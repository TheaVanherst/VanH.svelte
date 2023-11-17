
import { defineField, defineType } from 'sanity'
import { ErrorOutlineIcon } from '@sanity/icons'

const
  internalTags = defineType({
    name: 'nsfwTags', title: 'NSFW Content Tags',
    type: 'document',
    fields: [
      defineField({
        name: 'title', title: 'Title', type: 'string'}),
      defineField({
        name: 'relatedTags', title: 'Related Tags',
        description: 'Alternate tags in relation to the focus tag (Seperated by spaces)',
        type: 'text', rows: 3,
      })],
    icon: ErrorOutlineIcon,
    preview: {
      select: {title: 'title', desc: 'description'},
      prepare: ({title, emoji, desc}) => {
        return {title: `${title}`, subtitle: desc}}}
  });

export default internalTags;