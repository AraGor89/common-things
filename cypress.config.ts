import { defineConfig } from "cypress";

// load the environment variables from the local .env file
require("dotenv").config({ path: "./.env.test.local" });

export default defineConfig({
  env: {},
  e2e: {
    baseUrl: "http://localhost:3000",
    // baseUrl: "https://example.cypress.io",
    excludeSpecPattern: "**/examples/*.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // we can grab some process environment variables
      // and stick it into config.env before returning the updated config
      config.env = config.env || {};

      // you could extract only specific variables
      // and rename them if necessary
      config.env.REACT_APP_GOOGLE_API_KEY =
        process.env.REACT_APP_GOOGLE_API_KEY;
      config.env.REACT_APP_GOOGLE_SHEETS_ID =
        process.env.REACT_APP_GOOGLE_SHEETS_ID;
      config.env.REACT_APP_GOOGLE_SHEETS_API_URL =
        process.env.REACT_APP_GOOGLE_SHEETS_API_URL;
      config.env.NODE_ENV = process.env.NODE_ENV; //????????
      config.env.TEST_ENV = process.env.REACT_APP_TEST_ENV;

      return config;
    },
  },
});
