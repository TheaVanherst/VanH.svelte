
import blockContent from './blockContent';

import questionAndAnswers from './pageSpecific/questionAndAnswers';
import commissionData from './pageSpecific/commissionTerms';
import commissionTypes from './pageSpecific/commissionTypes';
import commissionPricing from './pageSpecific/commissionPricing'
import donationData from './pageSpecific/donationData';

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

import socialMedia from './websiteSettings/socialMedia'

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
    internalTags,

  socialMedia,
]

export const schemaTypes = dataTypes;
