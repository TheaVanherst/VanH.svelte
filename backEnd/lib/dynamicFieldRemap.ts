
// some-utility-method-file-blah-blah.ts
import {DocumentDefinition, FieldGroupDefinition, ObjectDefinition} from 'sanity'
import {LinkRemovedIcon} from '@sanity/icons'

// this is the definition of our custom group for unmapped fields
const unmappedFieldsGroup: FieldGroupDefinition = {
  name: 'unmapped-fields',
  icon: LinkRemovedIcon,
  title: 'Unmapped Fields',
}


type DocumentObjectDefinitionType = DocumentDefinition | ObjectDefinition

export const enhancedGroups = (definitions: DocumentObjectDefinitionType[]): DocumentObjectDefinitionType[]  => {

  const doMagic = (def: DocumentObjectDefinitionType) => {
    // Check if your document/object has any groups defined.
    if (def.groups && Array.isArray(def.groups) && def.groups.length > 0) {

      // Check if every field has a group defined.
      const everyFieldsHaveGroup = !!def.fields.every(
        (field) =>
          typeof field.group === 'string' || (Array.isArray(field.group) && field.group.length > 0)
      )

      // If some fields don't have a group, we can add our custom group.
      if (!everyFieldsHaveGroup) {
        // Add our custom group at the end of the list.
        def.groups.push(unmappedFieldsGroup)
        // Loop through all fields and add the unmapped group if a group is not defined.
        def.fields = def.fields.map((field) => {
          if (!field.group || (Array.isArray(field.group) && field.group.length === 0))
            field.group = unmappedFieldsGroup.name
          return field
        })
      }
    }
    return def
  }

  return definitions.map(doMagic)
}