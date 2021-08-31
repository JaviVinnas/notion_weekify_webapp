import { DatabasesQueryResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  CheckboxPropertyValue,
  DatePropertyValue,
  EmailPropertyValue,
  FilesPropertyValue,
  NumberPropertyValue,
  PropertyBase,
  PropertyValueBase,
  RelationProperty,
  RichTextInputPropertyValue,
  RollupProperty,
  SelectPropertyValue,
  TitleInputPropertyValue,
  URLPropertyValue,
} from "@notionhq/client/build/src/api-types";

const databaseMediaTypes = [
  "title",
  "date",
  "checkbox",
  "rich_text",
  "relation",
  "rollup",
  "image",
  "file",
  "video",
  "audio",
  "block",
  "url",
  "select",
  "number",
  "files",
  "email",
] as const;

export type RowMapper<
  T extends Record<string, typeof databaseMediaTypes[number]>
> = {
  [K in keyof T]: T[K] extends "title"
    ? TitleInputPropertyValue
    : T[K] extends "date"
    ? DatePropertyValue
    : T[K] extends "checkbox"
    ? CheckboxPropertyValue
    : T[K] extends "rich_text"
    ? RichTextInputPropertyValue
    : T[K] extends "relation"
    ? RelationProperty
    : T[K] extends "rollup"
    ? RollupProperty
    : T[K] extends "url"
    ? URLPropertyValue
    : T[K] extends "select"
    ? SelectPropertyValue
    : T[K] extends "number"
    ? NumberPropertyValue
    : T[K] extends "files"
    ? FilesPropertyValue
    : T[K] extends "email"
    ? EmailPropertyValue
    : never;
};

export type DBQueryResponse<
  T extends Record<string, typeof databaseMediaTypes[number]>
> = Omit<DatabasesQueryResponse, "results"> & { results: RowMapper<T>[] };

export const horariosDefinition = {
  Nombre: "title",
  Duración: "date",
  Práctica: "checkbox",
  Presencial: "checkbox",
  Ubicación: "rich_text",
  Asignatura: "relation",
  Cuatri: "rollup",
  Curso: "rollup",
} as const;

export const asignaturasDefinition = {
  Nombre: "title",
  "Nombre completo": "rich_text",
  "Link Aula Virtual": "url",
  "Grupo de prácticas": "rich_text",
  Cuatri: "select",
  Curso: "select",
  Obligatoriedad: "select",
  Créditos: "number",
  Ámbito: "select",
  Nota: "number",
  "Profe teóricas": "relation",
  "Profe prácticas": "relation",
  "Número teóricas": "number",
  "Número prácticas": "number",
  "Acabadas teóricas": "checkbox",
  "Acabadas prácticas": "checkbox",
  "Profes involucrados": "rollup",
  Temas: "relation",
  "Cosas con fecha asociada": "relation",
  Libros: "relation",
  Gradox: "files",
  Proyectos: "relation",
  Horario: "relation",
  "Link ETSE": "url",
} as const;

export const profesoresDefinition = {
  Nombre: "title",
  Correo: "email",
  Link: "url",
  Dirección: "rich_text",
  "Info tutorías": "rich_text",
  Nota: "number",
  "Clases / charlas / exámenes / trabajos": "relation",
  "Related to Asignaturas (Profe prácticas)": "relation",
  "Related to Asignaturas (Profe teóricas)": "relation",
} as const;
