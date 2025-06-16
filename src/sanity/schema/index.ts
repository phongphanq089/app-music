import { SchemaTypeDefinition } from 'sanity'
import category from './lib/category'
import track from './lib/track'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, track],
}
