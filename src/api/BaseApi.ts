import { Client, LogLevel } from "@notionhq/client";

export default abstract class BaseApi {
  protected client: Client;

  public constructor() {
    this.client = new Client({
      auth: process.env.INTERNAL_INTEGRATION_TOKEN,
      logLevel: LogLevel.DEBUG,
    });
  }
}
