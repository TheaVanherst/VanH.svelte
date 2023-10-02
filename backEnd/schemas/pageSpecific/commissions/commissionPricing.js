
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'commissionPrices',
  type: 'document',
  fields: [
    // TODO: User Data

    defineField({
      name: 'PreviewImages', title: 'Preview Images',
      type: 'array',
      of: [
        defineField({
          name: 'ImageSet', title: 'Render Preview',
          type: 'object',
          fields: [
            defineField({
              name: 'imageRender', title: 'Render',
              type: 'image',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'styleType', title: 'Style information',
              type: 'reference',
              to: { type: 'styleType' },
            }),
            defineField({
              name: 'renderType', title: 'Render information',
              type: 'reference',
              to: { type: 'renderType' },
            }),
            defineField({
              name: 'nsfwRender', title: 'Should this be hidden for SFW users?',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              render: 'renderType.renderName',
              style:  'styleType.styleName',
              icon:   'imageRender'
            },
            prepare: ({ render, style, icon }) => {
              return {
                title: `${render}, ${style}`,
                media: icon
              }
            }
          }
        }),
      ],
    }),

    defineField({
      name: 'prices', title: 'Prices',
      type: 'array',
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
              rows: 2,
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
      type: 'array',
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
      name: 'whatsIncluded', title: "What's included?",
      type: 'text',
      rows: 8,
    }),
  ],
})