import { type SchemaTypeDefinition } from 'sanity'
import  {siteSettings} from "@/sanity/schemaTypes/siteSettings";
import { service } from "@/sanity/schemaTypes/service";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, service],
}
