
import { defineConfig } from 'sanity'

import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemas'
import { structure }    from './structure'
import { table } from '@sanity/table';

import {enhancedGroups} from './lib/dynamicFieldRemap'

export default defineConfig({
  name: 'default',
  title: 'VanH.Svelte',

  projectId: 'pvetsaze',
  dataset: 'production',

  plugins: [
    deskTool({structure}),
    table(),
    visionTool()
  ],

  schema: {
    types: enhancedGroups(schemaTypes),
  },
  form: {
    components: {
      input: (props) => {
        if (Array.isArray(props.groups) && props.groups.length > 0) {
          if (props.groups[0].name === 'all-fields') {
            props.groups.shift()
          }
        }
        return props.renderDefault(props)
      },
    },
  },
})
