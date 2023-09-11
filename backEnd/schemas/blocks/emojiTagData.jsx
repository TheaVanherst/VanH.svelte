
import {defineField} from 'sanity'

const emojiTags = [
  defineField({
    name: 'title', title: 'Title',
    type: 'string',
  }),
  defineField({
    name: 'emoji', title: 'emoji',
    type: 'string',
  }),
  defineField({
    name: 'description', title: 'Description',
    description: 'this will only be shown when filtered',
    type: 'text',
  }),
]

const icon = (ico) => (
  <span>
    {ico}
  </span>
);

export { emojiTags, icon }