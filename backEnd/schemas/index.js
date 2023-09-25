
import blockContent from './blockContent';

import questionAndAnswers from './misc/questionAndAnswers';
import commissionData from './misc/commissionTerms';
import commissionTypes from './misc/commissionTypes';
import commissionPricing from './misc/commissionPricing'
import donationData from './misc/donationData';

import character from './characterData/character';
import sexTags from './characterData/sexTags';
import heightTag from './characterData/heightTypes';
import developmentStatus from './characterData/developmentStatus';

import author from './authorData/author';
import authorTags from './authorData/authorTags';
import internalTags from './authorData/internalTag';

import workshopItems from './alternateWorks/workshopItems';
import workshopSnippet from './alternateWorks/workshopSnippet';
import workshopGameTag from './alternateWorks/workshopGameTag';
import githubItems from './alternateWorks/githubItems';

const dataTypes = [
  // custom data types
  blockContent,

  // customPages
  questionAndAnswers,
  commissionData,
  commissionTypes,
  commissionPricing,
  donationData,

  character,
    sexTags,
    heightTag,
    developmentStatus,

  workshopItems,
  workshopSnippet,
    workshopGameTag,
  githubItems,

  author,
    authorTags,
    internalTags
]

export const schemaTypes = dataTypes;
