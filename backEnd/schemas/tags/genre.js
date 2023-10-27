
import { defineField, defineType } from 'sanity'
import { FolderIcon } from '@sanity/icons'

const
  internalTags = defineType({
    name: 'genreTag', title: 'Genre Tags',
    type: 'document',
    fields: [
      defineField({
        name: 'title', title: 'Title', type: 'string'})],
    icon: FolderIcon,
    preview: {
      select: {title: 'title', desc: 'description'},
      prepare: ({title, desc}) => {
        return {title: `${title}`, subtitle: desc}}}
  });

export default internalTags;