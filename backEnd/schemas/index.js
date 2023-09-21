
import blockContent from './blockContent';

import questionAndAnswers from './misc/questionAndAnswers';
import commissionData from './misc/commissionTerms';
import commissionTypes from './misc/commissionTypes';
import donationData from './misc/donationData'

import donationTiers from './misc/donationTiers'

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

  // customPages
  questionAndAnswers,
  commissionData,
  commissionTypes,
  donationData,

  // data types
  donationTiers,

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
