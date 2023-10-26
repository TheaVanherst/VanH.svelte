
import { defineType} from 'sanity'
import { TagsIcon }    from '@sanity/icons'
import { emojiTags, icon } from '../../lib/blocks/emojiTagData'

const
  artCategories = defineType({
    name: 'authorTags', title: 'Author Tags',
    type: 'document',
    fields: emojiTags,

    icon: TagsIcon,
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

export default artCategories;
