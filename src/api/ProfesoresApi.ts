import BaseApi from "./BaseApi";
import {
  DBQueryResponse,
  profesoresDefinition,
  RowMapper,
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
    const results: RowMapper<typeof profesoresDefinition>[] = [];
    rawResponse.results.forEach((rawResult) => {
      //if the colums are the expected we ad the value
      if (
        Object.keys(rawResult.properties).sort().join(",") ===
        Object.keys(profesoresDefinition).sort().join(",")
      ) {
        results.push(rawResult.properties as any);
      } else {
        throw new Error(
          "The columns found in the profesores table (1) are not the expected (2) ->" +
            rawResult.properties +
            profesoresDefinition
        );
      }
    });
    return { ...rawResponse, results };
  }
}

const profesoresApi = new ProfesoresApiImpl();

export function useProfesoresApi(): ProfesoresApi {
    return profesoresApi as ProfesoresApi;
  }
