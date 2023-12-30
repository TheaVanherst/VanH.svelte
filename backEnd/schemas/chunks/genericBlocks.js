import {defineField} from 'sanity'

const
  nsfwBlock = {
    name: 'NSFW',     title: 'Hide content?',
    type: 'boolean',
    initialValue: false,
    description: 'Should this image be hidden from the SFW version of the website?',
  };

export { nsfwBlock }

const
  authorBlock =
    defineField({
      name: 'author', title: 'Authors',
      validation: Rule => Rule.required(),
      type: 'reference',
      to: { type: 'author' },
    });

export { authorBlock }