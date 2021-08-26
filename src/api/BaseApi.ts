import { Client } from "@notionhq/client"

export abstract class BaseApi{
    protected client: Client;
    
    public constructor() {
        this.client = new Client({ auth: process.env.INTERNAL_INTEGRATION_TOKEN})
    }
}