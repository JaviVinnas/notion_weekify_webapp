import BaseApi from "./BaseApi";
import {
  DBQueryResponse,
  profesoresDefinition,
  RowPropertiesMapper,
} from "./types";

export interface ProfesoresApi {
  getProfesores(): Promise<DBQueryResponse<typeof profesoresDefinition>>;
}

class ProfesoresApiImpl extends BaseApi implements ProfesoresApi {
  constructor() {
    super();
  }

  async getProfesores(): Promise<DBQueryResponse<typeof profesoresDefinition>> {
    const rawResponse = await this.client.databases.query({
      database_id: process.env.PROFESORES_DB_ID,
    });
    console.log(rawResponse);
    //transform the results array
    //chech if value names are incorrect
    if (
      rawResponse.results.some(
        (pageResult) =>
          Object.keys(pageResult.properties).sort().join(",") !==
          Object.keys(profesoresDefinition).sort().join(",")
      )
    ) {
      throw new Error("Invalid profesores value column names");
    }
    return rawResponse as unknown as DBQueryResponse<typeof profesoresDefinition>
  }
}

const profesoresApi = new ProfesoresApiImpl();

export function useProfesoresApi(): ProfesoresApi {
    return profesoresApi as ProfesoresApi;
  }
