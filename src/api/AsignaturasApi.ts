import { DatabasesQueryParameters } from "@notionhq/client/build/src/api-endpoints";
import { DBQueryResponse } from ".";
import BaseApi from "./BaseApi";
import { asignaturasDefinition, RowMapper } from "./types";

export interface AsignaturasApi {
    getAsignaturas() : Promise<DBQueryResponse<typeof asignaturasDefinition>>
}

class AsignaturasApiImpl extends BaseApi implements AsignaturasApi {
    constructor() {
        super();
      }
    public async getAsignaturas(): Promise<DBQueryResponse<typeof asignaturasDefinition>> {
        const rawResponse = await this.client.databases.query({
            database_id: process.env.ASIGNATURAS_DB_ID,
        });
        console.log(rawResponse);
        const results: RowMapper<typeof asignaturasDefinition>[] = [];
        rawResponse.results.forEach((rawResult) => {
            if (
                Object.keys(rawResult.properties).sort().join(",") ===
                Object.keys(asignaturasDefinition).sort().join(",")
              ) {
                results.push(rawResult.properties as any);
              } else {
                throw new Error(
                  "The columns found in the horarios table (1) are not the expected (2) ->" +
                    rawResult.properties +
                    asignaturasDefinition
                );
              }
        });
        return { ...rawResponse, results };
    }
}

const asignaturasApi = new AsignaturasApiImpl();

export function useAsignaturasApi(): AsignaturasApi{
    return asignaturasApi as AsignaturasApi;
}