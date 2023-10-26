
import { defineField, defineType } from 'sanity'
import { ErrorOutlineIcon } from '@sanity/icons'

const
  internalTags = defineType({
    name: 'nsfwTags', title: 'NSFW Tags',
    type: 'document',
    fields: [
      defineField({
        name: 'title', title: 'Title', type: 'string'})],
    icon: ErrorOutlineIcon,
    preview: {
      select: {title: 'title', desc: 'description'},
      prepare: ({title, emoji, desc}) => {
        return {title: `${title}`, subtitle: desc}}}
  });

export default internalTags;