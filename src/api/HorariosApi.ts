import { TitleInputPropertyValue } from "@notionhq/client/build/src/api-types";
import { Curso, Cuatrimestre } from "../core";
import BaseApi from "./BaseApi";
import { NotionDBHorariosRow, notionDBHorariosColumnNames } from "./types";

export interface HorariosApi {
  getHorario(
    curso: Curso,
    cuatrimestre: Exclude<Cuatrimestre, "Anual">
  ): Promise<NotionDBHorariosRow[]>;
}

class HorariosApiImpl extends BaseApi implements HorariosApi {
  constructor() {
    super();
  }

  public async getHorario(
    curso: Curso,
    cuatri: Exclude<Cuatrimestre, "Anual">
  ): Promise<NotionDBHorariosRow[]> {
    const response = await this.client.databases.query({
      database_id: process.env.HORARIOS_DB_ID,
    });

    const result: NotionDBHorariosRow[] = [];

    response.results.forEach((row) => {
      //cada fila de la tabla
      const rowResult = {};

      notionDBHorariosColumnNames.forEach((column) => {
        const [columnName, typeDiscriminator] = column;
        const rowProperty = row.properties[columnName];
        if (rowProperty && rowProperty.type === typeDiscriminator) {
          rowResult[columnName] = rowProperty;
        }
      });
      result.push(rowResult as NotionDBHorariosRow);
    });

    return result;
  }
}

const horariosApi = new HorariosApiImpl();

export function useHorariosApi(): HorariosApi {
  return horariosApi as HorariosApi;
}
