
import {defineField} from 'sanity'
const
  altTextRequest = (obj) => {
    let arr = [];

    for (let i = 0; i < obj.length; i++) {
      if (obj[i]?.alt){
        arr[i] = ` ${i}: ${obj[i].alt}`;
      }
    }

    if(arr.length > 1) {
      return "Alt texts: [" + arr + "]";
    }
    else if (arr.length === 1) {
      return "Alt text: [" + arr + "]";
    }
    else if (arr.length === 0) {
      return "No alternative text provided.";
    }
  },

  blockGallery = {
    name: 'blockGallery',    title: 'Block Gallery',
    type: 'object',
    fields: [
      defineField({
        name: 'images',   title: 'Images',
        type: 'array',
        of: [{
          name: 'image',  title: 'Image',
          type: 'image',
          validation: Rule => Rule.required(),
          fields: [
            defineField({
              name: 'desc', title: 'Brief Description',
              type: 'string',
            }),
          ],
        }],
      }),
      defineField({
        name: 'display',  title: 'Display as',
        type: 'string',
        initialValue:
          { title: 'Stacked',           value: 'vertical' },
        options: {
          list: [
            { title: 'Stacked',          value: 'vertical' },
            { title: 'Dynamic Vertical', value: 'dynamicvertical' },
            { title: 'Dynamic Grid',     value: 'dynamicgrid' },
            { title: 'Grid',             value: 'grid' },
            { title: 'Scroll',           value: 'scroll' },
            { title: 'Carousel',         value: 'carousel' },
          ],
          layout: 'radio',
        },
      }),

      defineField({
        name: 'styleType', title: 'Style Type',
        type: 'reference',
        to: { type: 'styleType' },
        validation: Rule => Rule.required(),
      }),
      defineField({
        name: 'renderType', title: 'Render Type',
        type: 'reference',
        to: { type: 'renderType' },
        validation: Rule => Rule.required(),
      }),
    ],

    preview: {
      select: {
        images: 'images',
        image: 'images',
      },
      prepare: ({ images, image }) => {
        return {
          title: `Gallery block of ${Object.keys(images).length} images`,
          subtitle: altTextRequest(image),
          media: image[0]
        };
      },
    },
  };

export default blockGallery;