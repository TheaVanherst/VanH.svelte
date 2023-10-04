
import {DocumentDefinition, FieldGroupDefinition, ObjectDefinition} from 'sanity'
import {LinkRemovedIcon} from '@sanity/icons'

const unmappedFieldsGroup: FieldGroupDefinition = {
  name: 'unmapped-fields',
  icon: LinkRemovedIcon,
  title: 'Unmapped Fields',
}

type DocumentObjectDefinitionType = DocumentDefinition | ObjectDefinition

export const enhancedGroups = (definitions: DocumentObjectDefinitionType[]): DocumentObjectDefinitionType[]  => {
  const doMagic = (def: DocumentObjectDefinitionType) => {
    if (def.groups && Array.isArray(def.groups) && def.groups.length > 0) {
      const everyFieldsHaveGroup = !!def.fields.every(
        (field) =>
          typeof field.group === 'string' || (Array.isArray(field.group) && field.group.length > 0)
      );

      if (!everyFieldsHaveGroup) {
        def.groups.push(unmappedFieldsGroup);
        def.fields = def.fields.map((field) => {
          if (!field.group || (Array.isArray(field.group) && field.group.length === 0))
            field.group = unmappedFieldsGroup.name;
          return field;
        });
      }
    }
    return def;
  }

  return definitions.map(doMagic)
}