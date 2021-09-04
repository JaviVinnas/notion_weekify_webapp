import { DatabasesQueryParameters } from "@notionhq/client/build/src/api-endpoints";
import BaseApi from "./BaseApi";
import { horariosDefinition, DBQueryResponse, RowPropertiesMapper } from "./types";

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

    //check if column names are incorrect
    if (
      rawResponse.results.some(
        (pageResult) =>
          Object.keys(pageResult.properties).sort().join(",") !==
          Object.keys(horariosDefinition).sort().join(",")
      )
    ) {
      throw new Error("Invalid horarios value column names");
    }

    return rawResponse as unknown as DBQueryResponse<typeof horariosDefinition>;
  }
}

const horariosApi = new HorariosApiImpl();

export function useHorariosApi(): HorariosApi {
  return horariosApi as HorariosApi;
}
