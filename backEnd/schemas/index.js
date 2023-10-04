
import blockContent from './blockContent';
import blockGallery   from './blocks/galleryContentBlock';

import questionAndAnswers from './pageSpecific/home/questionAndAnswers';
import commissionData from './pageSpecific/commissions/commissionTerms';
import commissionTypes from './pageSpecific/commissions/commissionTypes';
import commissionPricing from './pageSpecific/commissions/commissionPricing'
import donationData from './pageSpecific/home/donationData';

import artworks from './arts/drawings';
import commissionType from './arts/commissionTypes';
import renderType from './arts/renderType';
import styleType from './arts/styleType';
import purchaseTypes from './arts/additionalTypes';

import character from './characterData/character';
import sexTags from './characterData/sexTags';
import heightTag from './characterData/heightTypes';
import developmentStatus from './characterData/developmentStatus';

import author from './authorData/author';
import authorTags from './authorData/authorTags';
import internalTags from './authorData/internalTag';

import commissioners from './authorData/commissioners';
import altCharacters from './characterData/altCharacters'

import workshopItems from './alternateWorks/workshopItems';
import workshopSnippet from './alternateWorks/workshopSnippet';
import workshopGameTag from './alternateWorks/workshopGameTag';
import githubItems from './alternateWorks/githubItems';

import socialMedia from './websiteSettings/socialMedia'

const dataTypes = [
  // custom data types
  blockContent,
  blockGallery,

  // art types
  artworks,
  commissionType,
  renderType,
  styleType,
  purchaseTypes,

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
  altCharacters,

  workshopItems,
  workshopSnippet,
    workshopGameTag,
  githubItems,

  author,
    authorTags,
    internalTags,
  commissioners,

  socialMedia,
]

export const schemaTypes = dataTypes;
