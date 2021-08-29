import {
  CheckboxPropertyValue,
  DatePropertyValue,
  PropertyBase,
  RelationProperty,
  RichTextInputPropertyValue,
  RollupProperty,
  TitleInputPropertyValue,
} from "@notionhq/client/build/src/api-types";

export const notionDBHorariosColumnNames = [
  ["Nombre", "title"],
  ["Duración", "date"],
  ["Práctica", "checkbox"],
  ["Presencial", "checkbox"],
  ["Ubicación", "rich_text"],
  ["Asignatura", "relation"],
  ["Cuatri", "rollup"],
  ["Año", "rollup"],
] as const;

export type NotionDBHorariosColumnName =
  typeof notionDBHorariosColumnNames[number][0];

//table column names
//table column names
export type NotionDBHorariosRow = {
  [key in NotionDBHorariosColumnName]: PropertyBase;
} & {
  Nombre: TitleInputPropertyValue;
  Duración: DatePropertyValue;
  Práctica: CheckboxPropertyValue;
  Presencial: CheckboxPropertyValue;
  Ubicación: RichTextInputPropertyValue;
  Asignatura: RelationProperty;
  Cuatri: RollupProperty;
  Año: RollupProperty;
};
