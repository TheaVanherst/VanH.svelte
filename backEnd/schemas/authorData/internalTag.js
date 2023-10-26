
import {defineType}  from 'sanity'
import { CheckmarkCircleIcon }    from '@sanity/icons'
import { emojiTags, icon } from '../../lib/blocks/emojiTagData'

const
  internalTags = defineType({
    name: 'internalTags', title: 'Internal Tags',
    type: 'document',
    fields: emojiTags,

    icon: CheckmarkCircleIcon,
    preview: {
      select: {
        emoji: 'emoji',
        title: 'title',
        desc: 'description'
      },
      prepare: ({title, emoji, desc}) => {
        return {
          title: `${title}`,
          subtitle: desc,
          media: icon(emoji),
        }
      }
    }
  });

export default internalTags;