
import blockContent from './blockContent';

import post from './post';
import category from './category';

import character from './characterData/character';
import sexTags from './characterData/sexTags'

import author from './authorData/author';
import authorTags from './authorData/authorTags';
import heightTag from './characterData/heightTypes';
import internalTags from './authorData/internalTag'

import workshopItems from './alternateWorks/workshopItems'
import workshopSnippet from './alternateWorks/workshopSnippet'
import workshopGameTag from './alternateWorks/workshopGameTag'
import githubItems from './alternateWorks/githubItems'

const dataTypes = [
  // custom data types
  blockContent,

  // data types
  post,
    category,

  character,
    sexTags,
    heightTag,

  workshopItems,
  workshopSnippet,
    workshopGameTag,
  githubItems,

  author,
    authorTags,
    internalTags
]

export const schemaTypes = dataTypes;
