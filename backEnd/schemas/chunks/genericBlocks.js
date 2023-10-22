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
      initialValue: {_type: 'reference', _ref: "3ad85859-8afa-437f-a74b-d4e83d6d6bdd"}
    });

export {authorBlock}