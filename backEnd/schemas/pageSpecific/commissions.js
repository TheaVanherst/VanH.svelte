
import {defineField, defineType} from 'sanity'
import {AccessDeniedIcon, BillIcon, BlockContentIcon, BookIcon} from '@sanity/icons'

export default defineType({
  name: 'commissions',
  title: 'commission data',
  type: 'document',
  groups: [
    { name: 'general', title: "General", default: true,
      icon: BlockContentIcon },
    { name: 'dnd', title: "Ds&Ds",
      icon: AccessDeniedIcon },
    { name: 'prices', title: 'Prices',
      icon: BillIcon },
    { name: 'tnc', title: 'T&Cs',
      icon: BookIcon },
  ],
  fields: [
    defineField({
      name: 'commissionExamples', title: 'Preview-able Commissions',
      type: 'array', group: 'general',
      of: [
        defineField({
          name: 'imageRender', title: 'Render',
          type: 'reference',
          to: [{type: 'artworks'}],
          validation: Rule => Rule.required()
        }),
      ],
    }),

    defineField({
      name: 'commissionInstructions', title: 'How to Commission',
      description: 'Instructions on how the user can commission, and general notices.',
      type: 'blockContent', group: 'general', rows: 20,
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'dosList', title: "Do's",
      type: 'object', group: 'dnd',
      fields: [
        defineField({
          name: 'title', title: "Do's Title",
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'desc', title: "Do's Description",
          type: 'string',
        }),
        defineField({
          name: 'banner',
          title: 'Banner Image',
          type: 'image',
        }),
        defineField({
          name: 'list', title: "Do list",
          type: 'array',
          of: [
            {
              name: 'item',
              title: 'A will do element',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ],
          validation: Rule => Rule.required()
        }),
      ]
    }),

    defineField({
      name: 'dontsList', title: "Dont's",
      type: 'object', group: 'dnd',
      fields: [
        defineField({
          name: 'title', title: "Dont's Title",
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'desc', title: "Dont's Description",
          type: 'string',
        }),
        defineField({
          name: 'banner',
          title: 'Banner Image',
          type: 'image',
        }),
        defineField({
          name: 'list', title: "Dont list",
          type: 'array',
          of: [
            {
              name: 'item',
              title: 'A will do element',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ],
          validation: Rule => Rule.required()
        }),
      ]
    }),

    defineField({
      name: 'exclusionText', title: 'Exclusion Text',
      type: 'string', group: 'dnd',
    }),

    defineField({
      name: 'prices', title: 'Prices',
      type: 'array', group: 'prices',
      of: [
        defineField({
          name: 'priceList', title: 'Price List',
          type: 'object',
          fields: [
            defineField({
              name: 'styleType', title: 'Style information',
              type: 'reference',
              to: { type: 'styleType' },
            }),
            defineField({
              name: 'styleDescription', title: 'Style Description',
              type: 'text',
              rows: 5,
            }),
            defineField({
              name: 'previewImage',
              title: 'Preview Image',
              type: 'image',
            }),
            defineField({
              name: 'styleTypes', title: 'Style type',
              type: 'array',
              of: [
                defineField({
                  name: 'priceSet', title: 'Price Set',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'renderType', title: 'Style information',
                      type: 'reference',
                      to: { type: 'renderType' },
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      name: 'renderTypePrice', title: 'Render Price',
                      type: 'number',
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      name: 'additionalPriceTag', title: 'Can this art type cost more?',
                      type: 'boolean',
                    }),
                  ],
                  preview: {
                    select: {
                      name: 'renderType.renderName',
                      price: 'renderTypePrice'
                    },
                    prepare: ({ name, price }) => {
                      return {title: name + ": £" + price,}
                    }
                  }
                }),
              ]
            }),
            defineField({
              name: 'additionalPurchases', title: 'Additional Purchases',
              type: 'array',
              of: [
                defineField({
                  name: 'additionalSet', title: 'Additional Set',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'renderType', title: 'Render Type',
                      type: 'string',
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      name: 'renderTypePrice', title: 'Render Price',
                      type: 'number',
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      name: 'additionalPriceTag', title: 'Can this art type cost more?',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      name: 'renderType',
                      price: 'renderTypePrice'
                    },
                    prepare: ({ name, price }) => {
                      return {title: name + ": £" + price,}
                    }
                  }
                }),
              ]
            }),
          ],
          preview: {
            select: {
              name:   'styleType.styleName',
              style1: 'styleTypes.0.renderType.renderName',
              style2: 'styleTypes.1.renderType.renderName',
              style3: 'styleTypes.2.renderType.renderName',
              style4: 'styleTypes.3.renderType.renderName',
              style5: 'styleTypes.4.renderType.renderName',
              price1: 'styleTypes.0.renderTypePrice',
              price2: 'styleTypes.1.renderTypePrice',
              price3: 'styleTypes.2.renderTypePrice',
              price4: 'styleTypes.3.renderTypePrice',
              price5: 'styleTypes.4.renderTypePrice',
              media:  'previewImage'
            },
            prepare: ({
                        name, media,
                        style1, style2, style3, style4, style5,
                        price1, price2, price3, price4, price5 }) => {

              let
                styles = [style1,style2,style3,style4,style5],
                prices = [price1,price2,price3,price4,price5];
              let
                returnString = "";

              for (let i = 0; i < styles.length; i++) {
                returnString += (!!prices[i] ? `${styles[i]}: £${prices[i]}` : '') + (!!prices[i+1] ? ', ' : '');}

              return {
                title: name,
                media: media,
                subtitle: returnString
              }
            }
          },
        }),
      ]
    }),

    defineField({
      name: 'additionalPurchases', title: 'Additional Purchases',
      type: 'array', group: 'prices',
      of: [
        defineField({
          name: 'additionalSet', title: 'Price Set',
          type: 'object',
          fields: [
            defineField({
              name: 'additionalPurchases', title: 'Additional Purchases',
              type: 'reference',
              to: { type: 'additionalPurchases' },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'additionalPrice', title: 'Additional Price',
              type: 'number',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'additionalPriceTag', title: 'Can this art type cost more?',
              type: 'boolean',
            }),
          ],
          preview: {
            select: {
              name: 'additionalPurchases.purchaseName',
              price: 'additionalPrice'
            },
            prepare: ({ name, price }) => {
              return {title: name + ": £" + price,}
            }
          }
        }),
      ]
    }),

    defineField({
      name: 'priceNotices', title: 'Price Notices',
      description: 'Things to note regarding commission prices & purchases',
      type: 'blockContent', group: 'prices', rows: 10,
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'terms', title: 'Terms & Conditions',
      description: 'Final words of note regarding terms and conditions.',
      type: 'blockContent', group: 'tnc', rows: 40,
      validation: Rule => Rule.required(),
    }),

  ],
  preview: {
    prepare: () => {
      return {
        title: "Commission Data"
      }
    }
  },
})