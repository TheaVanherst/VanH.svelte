
import { defineField, defineType } from 'sanity'
import { EyeOpenIcon } from '@sanity/icons'

const
  internalTags = defineType({
    name: 'genericTags', title: 'Generic Tags',
    type: 'document',
    fields: [
      defineField({
        name: 'title', title: 'Title', type: 'string'})],
    icon: EyeOpenIcon,
    preview: {
      select: {title: 'title', desc: 'description'},
      prepare: ({title, desc}) => {
        return {title: `${title}`, subtitle: desc}}}
  });

export default internalTags;