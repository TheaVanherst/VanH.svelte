
import { defineField, defineType } from 'sanity'
import { EarthAmericasIcon } from '@sanity/icons'

const
  cultureTags = defineType({
    name: 'cultureTags', title: 'Pop-Culture Tags',
    type: 'document',
    fields: [
      defineField({
        name: 'title', title: 'Title', type: 'string'}),
      defineField({
        name: 'relatedTags', title: 'Related Tags',
        description: 'Alternate tags in relation to the focus tag (Seperated by spaces)',
        type: 'text', rows: 3,
      })],
    icon: EarthAmericasIcon,
    preview: {
      select: {title: 'title', desc: 'description'},
      prepare: ({title, emoji, desc}) => {
        return {title: `${title}`, subtitle: desc}}}
  });

export default cultureTags;