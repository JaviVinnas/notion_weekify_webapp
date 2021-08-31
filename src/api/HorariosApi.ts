import { DatabasesQueryParameters } from "@notionhq/client/build/src/api-endpoints";
import BaseApi from "./BaseApi";
import { horariosDefinition, DBQueryResponse, RowMapper } from "./types";

export interface HorariosApi {
  getHorario(): Promise<DBQueryResponse<typeof horariosDefinition>>;
}

class HorariosApiImpl extends BaseApi implements HorariosApi {
  constructor() {
    super();
  }

  public async getHorario(): Promise<
    DBQueryResponse<typeof horariosDefinition>
  > {
    const rawResponse = await this.client.databases.query({
      database_id: process.env.HORARIOS_DB_ID,
    });
    console.log(rawResponse);
    //transform the results array
    const results: RowMapper<typeof horariosDefinition>[] = [];
    rawResponse.results.forEach((rawResult) => {
      //if the colums are the expected we ad the value
      if (
        Object.keys(rawResult.properties).sort().join(",") ===
        Object.keys(horariosDefinition).sort().join(",")
      ) {
        results.push(rawResult.properties as any);
      } else {
        throw new Error(
          "The columns found in the horarios table (1) are not the expected (2) ->" +
            rawResult.properties +
            horariosDefinition
        );
      }
    });
    return { ...rawResponse, results };
  }
}

const horariosApi = new HorariosApiImpl();

export function useHorariosApi(): HorariosApi {
  return horariosApi as HorariosApi;
}
