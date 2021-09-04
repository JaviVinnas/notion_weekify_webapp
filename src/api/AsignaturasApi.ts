import { DatabasesQueryParameters } from "@notionhq/client/build/src/api-endpoints";
import { DBQueryResponse } from ".";
import BaseApi from "./BaseApi";
import { asignaturasDefinition, RowPropertiesMapper } from "./types";

export interface AsignaturasApi {
  getAsignaturas(): Promise<DBQueryResponse<typeof asignaturasDefinition>>;
}

class AsignaturasApiImpl extends BaseApi implements AsignaturasApi {
  constructor() {
    super();
  }
  public async getAsignaturas(): Promise<
    DBQueryResponse<typeof asignaturasDefinition>
  > {
    const rawResponse = await this.client.databases.query({
      database_id: process.env.ASIGNATURAS_DB_ID,
    });
    console.log(rawResponse);
    //chech if value names are incorrect
    if (
      rawResponse.results.some(
        (pageResult) =>
          Object.keys(pageResult.properties).sort().join(",") !==
          Object.keys(asignaturasDefinition).sort().join(",")
      )
    ) {
      throw new Error("Invalid asignaturas value column names");
    }

    return rawResponse as unknown as DBQueryResponse<typeof asignaturasDefinition>

  }
}

const asignaturasApi = new AsignaturasApiImpl();

export function useAsignaturasApi(): AsignaturasApi {
  return asignaturasApi as AsignaturasApi;
}
