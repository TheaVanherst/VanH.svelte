
import {defineField} from 'sanity'

const tagData = [
  defineField({
    name: 'title', title: 'Title',
    type: 'string',
  }),
  defineField({
    name: 'description', title: 'Description',
    description: 'this will only be shown when filtered',
    type: 'text',
  }),
]

export default tagData;