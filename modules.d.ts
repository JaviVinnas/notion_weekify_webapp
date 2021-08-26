declare namespace NodeJS {
  /**
   * Override to add types for the environement variables 
   * **WARNING: if change types dont forget to change the rollup.config.js file "replace" plugin configuration and .env file**
   */
    export interface ProcessEnv {
      INTERNAL_INTEGRATION_TOKEN: string;
    }
  }