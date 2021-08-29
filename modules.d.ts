declare namespace NodeJS {
  /**
   * Override to add types for the environement variables 
   * **WARNING: if change types dont forget to change the rollup.config.js file "replace" plugin configuration and .env file**
   */
    export interface ProcessEnv {
      INTERNAL_INTEGRATION_TOKEN: string;
      ASIGNATURAS_DB_ID: string;
      PROFESORES_DB_ID: string;
      HORARIOS_DB_ID: string;
      COSASCONFECHA_DB_ID: string;
    }
  }