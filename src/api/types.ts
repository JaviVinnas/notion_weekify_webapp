import { DatabasesQueryResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  CheckboxPropertyValue,
  DatePropertyValue,
  PropertyBase,
  PropertyValueBase,
  RelationProperty,
  RichTextInputPropertyValue,
  RollupProperty,
  TitleInputPropertyValue,
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
  "url"
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
    : never;
  };


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

export type DBQueryResponse<T extends Record<string, typeof databaseMediaTypes[number]>> = Omit<DatabasesQueryResponse, "results"> & {results: RowMapper<T>[]}



export type AsignaturasDefinition = 
  | "Nombre"
  | "Nombre completo"
  | "Link Aula Virtual"
  | "Grupo de prácticas"
  | "Cuatri"
  | "Curso"
  | "Obligatoriedad"
  | "Créditos"
  | "Ámbito"
  | "Nota"
  | "Profe teóricas"
  | "Profe prácticas"
  | "Número teóricas"
  | "Número prácticas"
  | "Acabadas teóricas"
  | "Acabadas prácticas"
  | "Profes involucrados"
  | "Temas"
  | "Cosas con fecha asociada"
  | "Libros"
  | "Gradox"
  | "Proyectos"
  | "Horario"
  | "Link ETSE";
