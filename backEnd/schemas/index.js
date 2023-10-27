
import blockContent from '../lib/blocks/blockContent';
import blockGallery   from '../lib/blocks/galleryContentBlock';

import questionAndAnswers from './pageSpecific/home/questionAndAnswers';
import donationData from './pageSpecific/home/donationData';
import characterOrder from './pageSpecific/home/characterOrder'

import commissionData from './pageSpecific/commissions/commissionTerms';
import commissionTypes from './pageSpecific/commissions/commissionTypes';
import commissionPricing from './pageSpecific/commissions/commissionPricing'

import artworks from './arts/drawings';
import alternateArts from './arts/alternateArts'
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

import socialMedia from './pageSpecific/websiteSettings/socialMedia'
import featuredSocials from './pageSpecific/websiteSettings/featuredSocials'

import generic from './tags/generic'
import explicit from './tags/explicit'
import genre from './tags/genre'

const dataTypes = [
  // custom data types
  blockContent,
  blockGallery,

  // art types
  artworks,
  alternateArts,
  commissionType,
  renderType,
  styleType,
  purchaseTypes,

  // art tag data
  generic,
  explicit,
  genre,

  // customPages
  questionAndAnswers,
  donationData,
  characterOrder,

  commissionData,
  commissionTypes,
  commissionPricing,

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
  featuredSocials
]

export const schemaTypes = dataTypes;
